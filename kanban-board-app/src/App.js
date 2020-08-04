import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Header from "./components/Header";
import TasksPage from "./components/TasksPage";
import FlashMessage from "./components/FlashMessage";
import { getGroupedAndFilteredTasks } from "./selectors/taskSelectors";
import {
  createTask,
  editTask,
  setCurrentProjectId,
  fetchProjectsStarted,
  fetchTasksStarted,
  filterTasks,
} from "./actions";

const App = ({ tasks, projects, isLoading, error, dispatch }) => {
  useEffect(() => {
    dispatch(fetchProjectsStarted());
    dispatch(fetchTasksStarted());
  }, [dispatch]);

  const onCurrentProjectChange = (e) => {
    dispatch(setCurrentProjectId(Number(e.target.value)));
  };
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
    <div className="container">
      {error && <FlashMessage message={error} />}
      <div className="main-content">
        <Header
          projects={projects}
          onCurrentProjectChange={onCurrentProjectChange}
        />
        <TasksPage
          tasks={tasks}
          projects={projects}
          createTask={onCreateTask}
          searchTask={onSearch}
          editStatus={onStatusChange}
          loading={isLoading}
        />
      </div>
    </div>
  );
};

App.defaultProps = {
  tasks: {},
  projects: [],
  isLoading: false,
  error: null,
  dispatch: (f) => f,
};
App.propTypes = {
  tasks: PropTypes.objectOf(PropTypes.array),
  projects: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => {
  console.log(state);
  const { isLoading, error } = state.projects;
  return {
    tasks: getGroupedAndFilteredTasks(state),
    projects: state.projects.items,
    isLoading,
    error,
  };
};

export default connect(mapStateToProps)(App);
