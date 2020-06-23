import React from "react";
import PropTypes from "prop-types";

const Task = ({ task: { title, description } }) => {
  return (
    <div className="task">
      <div className="task-header">
        <div>{title}</div>
      </div>
      <hr />
      <div className="task-body">{description}</div>
    </div>
  );
};

Task.defaultProps = {
  task: PropTypes.shape({
    title: "",
    description: "",
  }),
};
Task.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default Task;
