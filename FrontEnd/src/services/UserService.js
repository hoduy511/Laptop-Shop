import axios from "./Customize-axios.js";

const loginApi = (username, password) => {
    return axios.post(`https://reqres.in/api/login`,{
        username: username,
        password: password
    })
}

const registerAPi = (email, password1, password2, first_name, last_name, phone_number) =>{
    return axios.post(`url`,{
        email: email,
        password1: password1,
        password2: password2,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number
    })
}

export {loginApi, registerAPi};