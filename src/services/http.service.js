import axios from "axios";

axios.defaults.baseURL = "https://0jsonplaceholder.typicode.com/"

const httpService = {
	get: axios.get
}

export default httpService


