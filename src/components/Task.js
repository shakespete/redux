import React from 'react';
import styled from 'styled-components';

const TaskContainer = styled.div`
    border: 1px solid #afafaf;
    margin: 20px 0px;
`;

const TASK_STATUSES = [
  'Unstarted',
  'In Progress',
  'Completed'
];

const Task = ({ task, onStatusChange }) => {
  const onStatusUpdate = (e) => {
    onStatusChange(task.id, e.target.value);
 }

  return (
    <TaskContainer>
      <div className="task-header">
        <div>{task.title}</div>
        <select value={task.status} onChange={onStatusUpdate}>
          {TASK_STATUSES.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <hr />
      <div className="task-body">{task.description}</div>
    </TaskContainer>
  );
}

export default Task;