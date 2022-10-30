import React, { useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {titleChanged, taskDeleted, completeTask, loadTasks,getTasks, getTaskLoadingStatus, createdTask} from "./store/task"
import configureStore from './store/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { getError } from './store/errors';

const store = configureStore()

const App = () => {
	const state = useSelector(getTasks())
	const isLoading = useSelector(getTaskLoadingStatus())
	const error = useSelector(getError())
	const dispatch = useDispatch()

	const changeTitle = (taskId) => {
		dispatch(titleChanged(taskId))
	}

	const deleteTask = (taskId) => {
		dispatch(taskDeleted(taskId))
	}

	useEffect(() => {
		dispatch(loadTasks())
	}, [])

	if(isLoading) {
		return <h1>Loading...</h1>
	}
	if(error) {
		return <p>{error}</p>
	}

	return <>
	<h1>App</h1> 
	<h3 style={{display: "inline", marginRight: 10}}>Создать новую задачу:</h3>
            <button
                style={{backgroundColor: "lightgreen", color: "black"}}
                onClick={() => dispatch(createdTask({title: "NEW TODO", completed: false}))}>
                Create Task
            </button>
            <hr />
	<ul>
		{state.map(el => 
			<li key={el.id}>
				<p>{el.title}</p>
				<p>{`Completed: ${el.completed}`}</p>
				<button onClick={() => dispatch(completeTask(el.id))}>
					Complete
				</button>
				<button onClick={() => changeTitle(el.id)}>
					Change title
				</button>
				<button onClick={() => deleteTask(el.id)}>
					Delete task
				</button>
				<hr />
			</li>)}
	</ul>
	</>
	
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	<Provider store={store}>
    <App />
	</Provider>
  </React.StrictMode>
);

