import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TasksPage from "./components/TasksPage";
import FlashMessage from "./components/FlashMessage";
import { getGroupedAndFilteredTasks } from "./reducers";
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
  tasks: {},
  isLoading: false,
  error: null,
  dispatch: (f) => f,
};
App.propTypes = {
  tasks: PropTypes.objectOf(PropTypes.array),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => {
  const { isLoading, error } = state.tasks;
  return {
    tasks: getGroupedAndFilteredTasks(state),
    isLoading,
    error,
  };
};

export default connect(mapStateToProps)(App);
