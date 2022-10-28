import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import {titleChanged, taskDeleted, completeTask, getTasks} from "./store/task"
import configureStore from './store/store';
import { Provider } from 'react-redux';

const store = configureStore()

const App = () => {
	const [state, setState] = useState(store.getState())
	
	const changeTitle = (taskId) => {
		store.dispatch(titleChanged(taskId))
	}

	const deleteTask = (taskId) => {
		store.dispatch(taskDeleted(taskId))
	}

	useEffect(() => {
		store.dispatch(getTasks())
		store.subscribe(() => {
			setState(store.getState())
		})
	}, [])

	return <>
	<h1>App</h1> 
	<ul>
		{state.map(el => 
			<li key={el.id}>
				<p>{el.title}</p>
				<p>{`Completed: ${el.completed}`}</p>
				<button onClick={() => store.dispatch(completeTask(el.id))}>
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

