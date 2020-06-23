import React from "react";
import TaskList from "./TaskList";

const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];

const TasksPage = ({ tasks }) => {
  const renderTaskLists = () => {
    return TASK_STATUSES.map((status) => {
      const statusTasks = tasks.filter((task) => task.status === status);
      return <TaskList key={status} status={status} tasks={statusTasks} />;
    });
  };

  return (
    <div className="tasks">
      <div className="task-lists">{renderTaskLists()}</div>
    </div>
  );
};

export default TasksPage;
