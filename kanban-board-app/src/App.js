import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TasksPage from "./components/TasksPage";

const App = ({ tasks }) => {
  return (
    <div className="main-content">
      <TasksPage tasks={tasks} />
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
};

const mapStateToProps = ({ tasks }) => {
  return {
    tasks,
  };
};

export default connect(mapStateToProps)(App);
