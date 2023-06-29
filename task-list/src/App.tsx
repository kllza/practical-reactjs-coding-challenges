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
  const showDeleteModal = false

  const handleAddEditModalToggle = () => {
    setShowAddEditModal(!showAddEditModal)
  }

  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    setTasks(taskList)
  }, [])

  const handleAddTask = (newTask: Task) => {
    const taskId = (Math.random() * 10000).toString()
    const updatedTasks = [{ ...newTask, id: taskId }, ...tasks]
    setTasks(updatedTasks)
  }

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />} onClick={handleAddEditModalToggle} />
        </div>
        <div className="task-container">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEditTask={function (taskId: string): void {
                throw new Error("Function not implemented.")
              }}
              onDeleteTask={function (taskId: string): void {
                throw new Error("Function not implemented.")
              }}
            />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskForm modal={showAddEditModal} toggleModal={handleAddEditModalToggle} onAddTask={handleAddTask} />
      )}
      {showDeleteModal && <DeleteModal />}
    </div>
  )
}

export default App
