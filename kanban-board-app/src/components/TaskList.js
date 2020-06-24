import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Task from "./Task";

const ListComponent = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 10px;
`;

const ListTitleComponent = styled.div`
  padding-bottom: 5px;
  margin-bottom: 5px;
`;

const TaskList = ({ status, tasks }) => {
  return (
    <ListComponent>
      <ListTitleComponent>
        <strong>{status}</strong>
      </ListTitleComponent>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </ListComponent>
  );
};

TaskList.defaultProps = {
  status: "",
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: -1,
      title: "",
      description: "",
      status: "",
    })
  ),
};
TaskList.propTypes = {
  status: PropTypes.string,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
    })
  ),
};

export default TaskList;
