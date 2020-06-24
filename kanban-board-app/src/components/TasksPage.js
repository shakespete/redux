import React from "react";
import PropTypes from "prop-types";
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

TasksPage.defaultProps = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: -1,
      title: "",
      description: "",
      status: "",
    })
  ),
};
TasksPage.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
    })
  ),
};

export default TasksPage;
