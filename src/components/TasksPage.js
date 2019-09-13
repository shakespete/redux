import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TaskList from "./TaskList";

const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];

// class TasksPage extends Component {
//   renderTaskLists() {
//     const { tasks } = this.props;
//     return TASK_STATUSES.map(status => {
//       const statusTasks = tasks.filter(task => task.status === status);
//       return <TaskList key={status} status={status} tasks={statusTasks} />;
//     });
//   }

//   render() {
//     return (
//       <div className="tasks">
//         <div className="task-lists">
//           {this.renderTaskLists()}
//         </div>
//       </div>
//     );
//   }
// }

const TaskListHeader = styled.div`
  width: 500px;
  text-align: right;
`;
const NewTaskButton = styled.button`
  background-color: #fafafa;
  border: 1px solid #afafaf;
  padding: 10px;
  cursor: pointer;
`;

const FormContainer = styled.form`
  background-color: #fafafa;
`;
const InputField = styled.input`
  padding: 10px;
  width: 300px;
`;
const SubmitButton = styled.button`
  background-color: #fafafa;
  border: 1px solid #afafaf;
  padding: 10px;
  cursor: pointer;
`;

const TaskContainer = styled.div`
  display: table;
`;

const TasksPage = ({ tasks, onCreateTask, onStatusChange, isLoading }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setShowForm(false);
  };

  const doCreateTask = e => {
    e.preventDefault();
    console.log(title);
    console.log(desc);
    onCreateTask({
      title: title,
      description: desc
    });
    resetForm();
  };

  const renderTaskLists = () => {
    return TASK_STATUSES.map(status => {
      const statusTasks = tasks.filter(task => task.status === status);
      return (
        <TaskList
          key={status}
          status={status}
          tasks={statusTasks}
          doStatusChange={onStatusChange}
        />
      );
    });
  };

  return (
    <>
      {isLoading ? (
        <div className="tasks-loading">Loading... 1</div>
      ) : (
        <div className="tasks">
          <TaskListHeader>
            <NewTaskButton onClick={() => setShowForm(!showForm)}>
              + New Task
            </NewTaskButton>
          </TaskListHeader>
          {showForm && (
            <FormContainer onSubmit={e => doCreateTask(e)}>
              <InputField onChange={e => setTitle(e.target.value)} />
              <br />
              <InputField onChange={e => setDesc(e.target.value)} />
              <br />
              <SubmitButton type="submit">Submit</SubmitButton>
            </FormContainer>
          )}
          <TaskContainer>{renderTaskLists()}</TaskContainer>
        </div>
      )}
    </>
  );
};

export default TasksPage;
