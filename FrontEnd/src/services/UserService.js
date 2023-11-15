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
        console.error('Đăng xuất thất bại:',error);
    } 
}

const getUser = (accessToken) => {
    try{
        return axios.get(`/api/user/`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!:',error);
    } 
}

const getUserProfile = (accessToken) => {
    try{
        return axios.get(`/api/user/profile/`,
            JSON.stringify({}),
                {
                    headers: { 'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}` },
                    withCredentials: true
                }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!',error);
    } 
}

const resetPassword = (email) => {
    try{
        return axios.post(`/password/reset/`,
                {
                    email: email,
                }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!:',error);
    } 
}

const getAddressList = (accessToken) => {
    try{
        return axios.get(`/api/user/profile/address/`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    },
                }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!:',error);
    } 
}

const updateAddressId = (accessToken, address) => {
    try{
        return axios.patch(`/api/user/profile/address/${address.id}/`,{
            "address_type": address.address_type,
            "default": address.default,
            "country": address.country,
            "city": address.city,
            "street_address": address.street_address,
            "apartment_address": address.apartment_address,
            "postal_code": address.postal_code,
        },{
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                    },
            }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!:',error);
    } 
}

const deleteAddressId = (accessToken, address) => {
    try{
        return axios.delete(`/api/user/profile/address/${address.id}/`,{
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                    },
            }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!:',error);
    } 
}

const createNewAddress = (accessToken, address) => {
    try{
        return axios.post(`/api/user/profile/address/`,{
            "address_type": address.address_type,
            "default": address.default,
            "country": address.country,
            "city": address.city,
            "street_address": address.street_address,
            "apartment_address": address.apartment_address,
            "postal_code": address.postal_code,
        },{
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                    },
            }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!:',error);
    } 
}

const changeAvatar = (accessToken, fd) => {
    try{
        return axios.patch(`/api/user/profile/`,fd,{
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    },
            }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!:',error);
    } 
}

const changeBio = (accessToken, bio) => {
    try{
        return axios.patch(`/api/user/profile/`,{
            bio: bio
        },{
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    },
            }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!:',error);
    } 
}

export {loginApi, 
    registerAPi, 
    logoutApi, 
    getUser, 
    getUserProfile, 
    resetPassword, 
    getAddressList, 
    updateAddressId, 
    deleteAddressId, 
    createNewAddress,
    changeAvatar,
    changeBio
};