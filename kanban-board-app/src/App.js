import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TasksPage from "./components/TasksPage";
import { createTask, editTask, fetchTasks } from "./actions";

const App = ({ tasks, dispatch }) => {
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const onCreateTask = ({ title, description }) => {
    dispatch(createTask({ title, description }));
  };
  const onStatusChange = (id, status) => {
    dispatch(editTask(id, { status }));
  };

  return (
    <div className="main-content">
      <TasksPage
        tasks={tasks}
        createTask={onCreateTask}
        editStatus={onStatusChange}
      />
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
