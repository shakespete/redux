import React from "react";
import PropTypes from "prop-types";

const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];

const Task = ({ task: { id, title, description, status }, statusChange }) => {
  const onStatusChange = (e) => {
    statusChange(id, e.target.value);
  };

  return (
    <div className="task">
      <div className="task-header">
        <div>{title}</div>
        <select value={status} onChange={onStatusChange}>
          {TASK_STATUSES.map((stat) => (
            <option key={stat} value={stat}>
              {stat}
            </option>
          ))}
        </select>
      </div>
      <hr />
      <div className="task-body">{description}</div>
    </div>
  );
};

Task.defaultProps = {
  task: PropTypes.shape({
    id: -1,
    title: "",
    description: "",
    status: "",
  }),
  statusChange: (f) => f,
};
Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  statusChange: PropTypes.func,
};

export default Task;
