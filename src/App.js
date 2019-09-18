import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import TasksPage from './components/TasksPage';
import FlashMessage from './components/FlashMessage';
import { createTask, editTask, fetchTasks } from './actions';


const App = ({ tasks, isLoading, error, dispatch }) => {
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
      {error && <FlashMessage message={error} />}
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
  console.group("3: MAP STATE TO PROPS");
  console.log(state);
  console.groupEnd();
  const { tasks, isLoading, error } = state.tasks;
  return { tasks, isLoading, error };
}

export default connect(mapStateToProps)(App);
