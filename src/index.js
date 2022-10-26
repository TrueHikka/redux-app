import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as actions from "./store/actions"
import { initialStore } from './store/store';

const store = initialStore()

const App = () => {
	const [state, setState] = useState(store.getState())
	
	const completeTask = (taskId) => {
		store.dispatch(actions.taskCompleted(taskId))
	}
	
	const changeTitle = (taskId) => {
		store.dispatch(actions.titleChanged(taskId))
	}

	useEffect(() => {
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
				<button onClick={() => completeTask(el.id)}>
					Complete
				</button>
				<button onClick={() => changeTitle(el.id)}>
					Change title
				</button>
				<hr />
			</li>)}
	</ul>
	</>
	
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

