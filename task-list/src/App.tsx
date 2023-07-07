import "./App.scss"
import { ReactComponent as Add } from "./assets/icons/add.svg"
import AddEditTaskForm from "./components/AddEditTaskForm"
import Button from "./components/Button"
import DeleteModal from "./components/DeleteModal"
import TaskCard from "./components/TaskCard"
import { useState, useEffect } from "react"
import { taskList } from "./siteData/taskList" // Importar la lista de tareas existentes

interface Task {
  id: string
  title: string
  priority: string
  status: string
  progress: number
}

const App = () => {
  const [showAddEditModal, setShowAddEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedTaskForEdit, setSelectedTaskForEdit] = useState<Task | null>(null)

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const handleDeleteTask = () => {
    if (selectedTask) {
      const updatedTasks = tasks.filter((task) => task.id !== selectedTask.id)
      setTasks(updatedTasks)
      setSelectedTask(null)
      setShowDeleteModal(false)
    }
  }

  const handleCancelDelete = () => {
    setSelectedTask(null)
    setShowDeleteModal(false)
  }

  const handleDeleteModalToggle = (task: Task) => {
    setSelectedTask(task)
    setShowDeleteModal(true)
  }

  const handleAddEditModalToggle = (task: Task | null) => {
    setSelectedTaskForEdit(task)
    setShowAddEditModal(!showAddEditModal)
  }

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    setTasks(taskList)
  }, [])

  const handleAddTask = (newTask: Task) => {
    if (selectedTaskForEdit) {
      const updatedTasks = tasks.map((task) => (task.id === selectedTaskForEdit.id ? { ...task, ...newTask } : task))
      setTasks(updatedTasks)
      setSelectedTaskForEdit(null)
    } else {
      const taskId = (Math.random() * 10000).toString()
      const updatedTasks = [{ ...newTask, id: taskId }, ...tasks]
      setTasks(updatedTasks)
    }
  }

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />} onClick={() => handleAddEditModalToggle(null)} />
        </div>
        <div className="task-container">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEditTask={() => handleAddEditModalToggle(task)}
              onDeleteTask={() => handleDeleteModalToggle(task)}
            />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskForm
          modal={showAddEditModal}
          toggleModal={() => handleAddEditModalToggle(null)}
          onAddTask={handleAddTask}
          task={selectedTaskForEdit}
        />
      )}
      {showDeleteModal && <DeleteModal task={selectedTask} onDelete={handleDeleteTask} onCancel={handleCancelDelete} />}
    </div>
  )
}

export default App
