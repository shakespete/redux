import React, { useState } from "react";
import PropTypes from "prop-types";
import CircleLoader from "react-spinners/CircleLoader";
import TaskList from "./TaskList";

const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];

const TasksPage = ({ tasks, createTask, searchTask, editStatus, loading }) => {
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const resetForm = () => {
    setShowNewCardForm(false);
    setTitle("");
    setDescription("");
  };

  const onCreateTask = (e) => {
    e.preventDefault();
    createTask({
      title,
      description,
    });
    resetForm();
  };

  const toggleForm = () => {
    setShowNewCardForm((show) => !show);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const renderTaskLists = () => {
    return TASK_STATUSES.map((status) => {
      const statusTasks = tasks.filter((task) => task.status === status);
      return (
        <TaskList
          key={status}
          status={status}
          tasks={statusTasks}
          onStatusChange={editStatus}
        />
      );
    });
  };

  const onSearch = (e) => {
    searchTask(e.target.value);
  };

  return (
    <div className="tasks">
      {loading ? (
        <CircleLoader />
      ) : (
        <>
          <div className="task-list-header">
            <input onChange={onSearch} type="text" placeholder="Search..." />
            <button type="button" onClick={toggleForm}>
              + New task
            </button>
          </div>
          {showNewCardForm && (
            <form className="task-list-form" onSubmit={onCreateTask}>
              <input
                className="full-width-input"
                onChange={handleTitleChange}
                value={title}
                type="text"
                placeholder="title"
              />
              <input
                className="full-width-input"
                onChange={handleDescriptionChange}
                value={description}
                type="text"
                placeholder="description"
              />
              <button type="submit">Save</button>
            </form>
          )}
          <div className="task-lists">{renderTaskLists()}</div>
        </>
      )}
    </div>
  );
};

TasksPage.defaultProps = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: -1,
      title: "",
      description: "",
      status: "",
      timer: 0,
    })
  ),
  createTask: (f) => f,
  searchTask: (f) => f,
  editStatus: (f) => f,
  loading: false,
};
TasksPage.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      status: PropTypes.string,
      timer: PropTypes.number,
    })
  ),
  createTask: PropTypes.func,
  searchTask: PropTypes.func,
  editStatus: PropTypes.func,
  loading: PropTypes.bool,
};

export default TasksPage;
