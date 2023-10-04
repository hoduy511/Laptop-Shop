import axios from "./Customize-axios.js";

const loginApi = (username, password) => {
    return axios.post(`https://reqres.in/api/login`,{
        username: username,
        password: password
    })
}

export {loginApi};