import axios from "./Customize-axios.js";

const loginApi = (email, password) => {
    try{
        return axios.post(`/api/user/login/`,
            JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
        )
    } catch(error){
        console.error('Đăng nhập thất bại:',error);
    } 
}
const registerAPi = (email, password1, password2, first_name, last_name, phone_number, validPhoneNumber) =>{
    try{
        if (validPhoneNumber && email){
            return axios.post(`/api/user/register/`,{
                email: email,
                password1: password1,
                password2: password2,
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
            });
        } else if(validPhoneNumber && !email){
            return axios.post(`/api/user/register/`,{
                password1: password1,
                password2: password2,
                first_name: first_name,
                last_name: last_name,
                phone_number: phone_number,
            });
        } else if(!validPhoneNumber && email){
            return axios.post(`/api/user/register/`,{
                email: email,
                password1: password1,
                password2: password2,
                first_name: first_name,
                last_name: last_name,
            });
        } else{
            console.log('validate:',validPhoneNumber);
            alert('Lỗi cú pháp!');
        }
    } catch (error){
        console.error('Lỗi gửi yêu cầu lên POST:',error);
    }
}

const logoutApi = (accessToken) =>{
    try{
        return axios.post(`/dj-rest-auth/logout/`,{
            headers: {"Authorization": `Bearer ${accessToken}`}
        })
    } catch(error){
        console.error('Đăng nhập thất bại:',error);
    } 
}

export {loginApi, registerAPi, logoutApi};