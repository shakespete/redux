import React from 'react';
import styled from 'styled-components';
import Task from './Task';


const ListContainer = styled.div`
    padding: 10px;
    display: table-cell;
`;

const TaskList = ({status, tasks, doStatusChange}) => {
  return (
    <ListContainer>
      <div className="task-list-title">
        <strong>{status}</strong>
      </div>
      {tasks.map(task => (
        <Task key={task.id} task={task} onStatusChange={doStatusChange} />
      ))}
    </ListContainer>
  );
}

export default TaskList;