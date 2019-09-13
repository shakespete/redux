import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import TasksPage from './components/TasksPage';
import { createTask, editTask, fetchTasks } from './actions';


const App = ({ tasks, isLoading, dispatch }) => {
  // console.log(props); // Because of 'connect' App has dispatch
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);


  const onCreateTask = ({ title, description }) => {
    dispatch(createTask({ title, description }));
  }

  const onStatusChange = (id, status) => {
    dispatch(editTask(id, { status }));
  }

  return (
    <div className="main-content">
      <TasksPage
        tasks={tasks}
        onCreateTask={onCreateTask}
        onStatusChange={onStatusChange}
        isLoading={isLoading}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  console.log("3: MAP STATE TO PROPS");
  console.log(state);
  const { tasks, isLoading } = state.tasks;
  return { tasks, isLoading };
}

export default connect(mapStateToProps)(App);
