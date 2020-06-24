import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TasksPage from "./components/TasksPage";
import { createTask } from "./actions";

const App = ({ tasks, dispatch }) => {
  const onCreateTask = ({ title, description }) => {
    dispatch(createTask({ title, description }));
  };

  return (
    <div className="main-content">
      <TasksPage tasks={tasks} createTask={onCreateTask} />
    </div>
  );
};

App.defaultProps = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: -1,
      title: "",
      description: "",
      status: "",
    })
  ),
  dispatch: (f) => f,
};
App.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
    })
  ),
  dispatch: PropTypes.func,
};

const mapStateToProps = ({ tasks }) => {
  return {
    tasks,
  };
};

export default connect(mapStateToProps)(App);
