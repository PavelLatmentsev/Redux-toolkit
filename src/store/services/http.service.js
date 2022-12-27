import axios from "axios";
axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/"
const httpsService = {
    get: axios.get,
    post: axios.post
};

export default httpsService;