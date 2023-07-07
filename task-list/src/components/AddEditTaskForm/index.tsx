import classNames from "classnames";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import "./style.scss";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  priority: string;
  status: string;
  progress: number;
}

interface AddEditTaskFormProps {
  modal: boolean;
  toggleModal: () => void;
  onAddTask: (task: Task) => void;
  task: Task | null;
}

const AddEditTaskForm: React.FC<AddEditTaskFormProps> = ({ modal, toggleModal, onAddTask, task }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  useEffect(() => {
    if (task) {
      setTaskTitle(task.title);
      setSelectedPriority(task.priority);
    } else {
      setTaskTitle("");
      setSelectedPriority("");
    }
  }, [task]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTask: Task = {
      id: task ? task.id : "",
      title: taskTitle,
      priority: selectedPriority,
      status: "To Do",
      progress: 0,
    };
    onAddTask(newTask);
    setInputValue("");
    setSelectedPriority("");
  };

  const handlePrioritySelection = (priority: string) => {
    setSelectedPriority(priority);
  };

  return (
    <>
      {modal && (
        <Modal>
          <form onSubmit={handleSubmit}>
            <div className="add-edit-modal">
              <div className="flx-between">
                <span className="modal-title">{task ? "Edit Task" : "Add Task"}</span>
                <Close className="cp" onClick={toggleModal} />
              </div>
              <Input
                label="Task"
                placeholder="Type your task here..."
                onChange={handleChange}
                name="title"
                value={taskTitle}
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
                <Button title="Save" type="submit" />
              </div>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

export default AddEditTaskForm;
