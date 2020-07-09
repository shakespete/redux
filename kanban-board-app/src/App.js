import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TasksPage from "./components/TasksPage";
import FlashMessage from "./components/FlashMessage";
import { createTask, editTask, fetchTasks } from "./actions";

const App = ({ tasks, isLoading, error, dispatch }) => {
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onCreateTask = ({ title, description }) => {
    dispatch(createTask({ title, description }));
  };
  const onStatusChange = (id, status) => {
    dispatch(editTask(id, { status }));
  };
  return (
    <div className="main-content">
      {error && <FlashMessage message={error} />}
      <TasksPage
        tasks={tasks}
        createTask={onCreateTask}
        editStatus={onStatusChange}
        loading={isLoading}
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
  isLoading: false,
  error: null,
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
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  dispatch: PropTypes.func,
};

const mapStateToProps = ({ tasks }) => {
  return {
    tasks: tasks.tasks,
    isLoading: tasks.isLoading,
    error: tasks.error,
  };
};

export default connect(mapStateToProps)(App);
