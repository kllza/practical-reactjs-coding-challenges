import classNames from "classnames"
import { ReactComponent as Close } from "../../assets/icons/close.svg"
import Button from "../Button"
import Input from "../Input"
import Modal from "../Modal"
import "./style.scss"
import { useState, ChangeEvent, FormEvent } from "react"

interface Task {
  id: string
  title: string
  priority: string
  status: string
  progress: number
}

interface AddEditTaskFormProps {
  modal: boolean
  toggleModal: () => void
  onAddTask: (task: Task) => void
}

const AddEditTaskForm: React.FC<AddEditTaskFormProps> = ({ modal, toggleModal, onAddTask }) => {
  const [inputValue, setInputValue] = useState("")
  const [selectedPriority, setSelectedPriority] = useState("")

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newTask: Task = {
      id: "", // Genera un ID único para la tarea si es necesario
      title: inputValue,
      priority: selectedPriority,
      status: "To Do",
      progress: 0,
    }
    onAddTask(newTask)
    setInputValue("")
    setSelectedPriority("")
  }

  const handlePrioritySelection = (priority: string) => {
    setSelectedPriority(priority)
    console.log(priority)
  }

  return (
    <div>
      {modal && (
        <Modal>
          <form onSubmit={handleSubmit}>
            <div className="add-edit-modal">
              <div className="flx-between">
                <span className="modal-title">Add Task</span>
                <Close className="cp" onClick={toggleModal} />
              </div>
              <Input
                label="Task"
                placeholder="Type your task here..."
                onChange={handleChange}
                name="title"
                value={inputValue}
              />
              <div className="modal-priority">
                <span>Priority</span>
                <ul className="priority-buttons">
                  {["high", "medium", "low"].map((priority) => (
                    <li
                      key={priority}
                      className={classNames(`${priority}-selected`, priority, {
                        selected: selectedPriority === priority,
                      })}
                      onClick={() => handlePrioritySelection(priority)}
                    >
                      {priority}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flx-right mt-50">
                <Button title="Add" type="submit" />
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default AddEditTaskForm
