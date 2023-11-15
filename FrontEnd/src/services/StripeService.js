import axios from "axios";
import {API_URL, } from '../config/Config'
const stripeCreateCheckout = (accessToken, order_id) => {
    try{
        console.log(order_id);
        return axios.post(`${API_URL}/api/user/payments/stripe/create-checkout-session/${order_id}/`,{
            headers: {
                'Authorization': `Basic ${accessToken}`,
                },
        })
    } catch(error){
        console.error('Lỗi stripe',error);
        return 'exists';
    } 
}

export {stripeCreateCheckout};