import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TasksPage from "./components/TasksPage";
import FlashMessage from "./components/FlashMessage";
import { getFilteredTasks } from "./reducers";
import {
  createTask,
  editTask,
  fetchTasksStarted,
  filterTasks,
} from "./actions";

const App = ({ tasks, isLoading, error, dispatch }) => {
  useEffect(() => {
    dispatch(fetchTasksStarted());
  }, [dispatch]);

  const onCreateTask = ({ title, description }) => {
    dispatch(createTask({ title, description }));
  };
  const onStatusChange = (id, status) => {
    dispatch(editTask(id, { status }));
  };
  const onSearch = (searchTerm) => {
    dispatch(filterTasks(searchTerm));
  };

  return (
    <div className="main-content">
      {error && <FlashMessage message={error} />}
      <TasksPage
        tasks={tasks}
        createTask={onCreateTask}
        searchTask={onSearch}
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
      timer: 0,
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
      timer: PropTypes.number,
    })
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  dispatch: PropTypes.func,
};

const mapStateToProps = ({ tasks }) => {
  return {
    tasks: getFilteredTasks(tasks.tasks, tasks.searchTerm),
    isLoading: tasks.isLoading,
    error: tasks.error,
    searchTerm: tasks.searchTerm,
  };
};

export default connect(mapStateToProps)(App);
