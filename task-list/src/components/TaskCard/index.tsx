import classNames from "classnames";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import CircularProgressBar from "../CircularProgressBar";
import "./style.scss";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  priority: string;
  progress: number;
}

interface TaskCardProps {
  task: Task;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEditTask, onDeleteTask }) => {
  const { id, title, priority} = task;

  const handleEditClick = () => {
    onEditTask(id);
  };

  const handleDeleteClick = () => {
    onDeleteTask(id);
  };

  const [currentStatus, setCurrentStatus] = useState("To Do");

  const handleStatusClick = () => {
    let newStatus = "";

    if (currentStatus === "To Do") {
      newStatus = "In Progress";
    } else if (currentStatus === "In Progress") {
      newStatus = "Done";
    } else if (currentStatus === "Done") {
      newStatus = "To Do";
    }

    setCurrentStatus(newStatus);
  };

  let progressBarPercentage = 0;

  if (currentStatus === "In Progress") {
    progressBarPercentage = 50;
  } else if (currentStatus === "Done") {
    progressBarPercentage = 100;
  }

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status" onClick={handleStatusClick}>
          {currentStatus}
        </button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={progressBarPercentage} />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={handleEditClick} />
        <DeleteIcon className="cp" onClick={handleDeleteClick} />
      </div>
    </div>
  );
};

export default TaskCard;
