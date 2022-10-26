import { createStore} from "redux";
import { taskReducer } from "./taskReduser";

const initialState = [{id: 1, title: "Task 1", completed: false}, {id: 2, title: "Task 2", completed: false}]

export function initialStore() {
	return createStore(taskReducer, initialState)
}