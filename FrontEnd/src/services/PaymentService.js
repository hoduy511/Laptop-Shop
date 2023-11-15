import { all } from "axios";
import axios from "./Customize-axios";

const getPaymentsList = (accessToken) => {
    try{
        return axios.get(`/api/user/payments/`,{
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    },
            }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!:',error);
    } 
}

const createPayment = (accessToken, opt, id) => {
    try{
        return axios.post(`/api/user/payments/`,{
            "payment_option": opt,
            "order": id
        },{
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    },
            }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!:',error);
        return 'exists';
    } 
}

const getPaymentCheckout = (accessToken, id) => {
    try{
        return axios.get(`/api/user/payments/checkout/${id}/`,{
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    },
            }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!:',error);
        return 'exists';
    } 
}

const putPaymentCheckout = (accessToken, opt, address, id) => {
    try{
        return axios.put(`/api/user/payments/checkout/${id}/`,{
            "payment": {
              "payment_option": opt
            },
            "shipping_address": {
              "default": address.default,
              "country": address.country,
              "city": address.city,
              "street_address": address.street_address,
              "apartment_address": address.apartment_address,
              "postal_code": address.postal_code
            },
            "billing_address": {
              "default": address.default,
              "country": address.country,
              "city": address.city,
              "street_address": address.street_address,
              "apartment_address": address.apartment_address,
              "postal_code": address.postal_code
            }
          },{
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    },
            }
        )
    } catch(error){
        console.error('Lấy thông tin thất bại!:',error);
        return 'exists';
    } 
}


export {
    getPaymentCheckout,
    getPaymentsList,
    putPaymentCheckout,
    createPayment
    };