
import axios from "./Customize-axios";


const getOrdersList = async (accessToken) =>{
    try{
        const response = await axios.get(`/api/user/orders/`,{
            headers: {"Authorization": `Bearer ${accessToken}`}
        },{
        });
        return response;
    } catch(error){
        console.error('Failed to get order from server:',error);
    }
}

const getOrdersId = (accessToken, id) =>{
    try{
        const reponse = axios.get(`/api/user/orders/${id}/`,{
            headers: {"Authorization": `Bearer ${accessToken}`}
        })
        return reponse;
    } catch(error){
        console.error('Failed to get order from server:',error);
    } 
}

const createOrders = (accessToken, product) =>{
    try{
        return axios.post(`/api/user/orders/`, {
            order_items:[
                {
                  "product": product.id,
                  "quantity": 1
                }
            ]
        }, {
            headers: {"Authorization": `Bearer ${accessToken}`},
        });
    } catch(error){
        console.error('Failed to post order from server:',error);
    } 
}

const deleteOrdersId = (accessToken, id) =>{
    try{
        return axios.delete(`/api/user/orders/${id}/`,{
            headers: {"Authorization": `Bearer ${accessToken}`},
        })
    } catch(error){
        console.error('Failed to post order from server:',error);
    } 
}

const getOrdersItemFromOrders = (accessToken, order_id) =>{
    try{
        return axios.get(`/api/user/orders/${order_id}/order-items/`,{
            headers: {"Authorization": `Bearer ${accessToken}`}
        })
    } catch(error){
        console.error('Failed to post order from server:',error);
    } 
}

const postOrdersItemToOrders = (accessToken, order, item) =>{
    try{
        return axios.post(`/api/user/orders/${order.id}/order-items/`,{
            product: item.id,
            quantity: 1
        },{
            headers: {
                'Authorization': `Bearer ${accessToken}`
              }
        })
    } catch(error){
        console.error('Failed to post order from server:',error);
    } 
}

const getOrdersItemByIdFromOrders = (accessToken, order_id, id) =>{
    try{
        return axios.get(`/api/user/orders/${order_id}/order-items/${id}`,{
            headers: {"Authorization": `Bearer ${accessToken}`}
        })
    } catch(error){
        console.error('Failed to post order from server:',error);
    } 
}

const postOrdersItemByIdFromOrders = (accessToken, order, item) =>{
    try{
        return axios.post(`/api/user/orders/${order.id}/order-items/${item.id}`,{
            headers: {"Authorization": `Bearer ${accessToken}`}
        })
    } catch(error){
        console.error('Failed to post order from server:',error);
    } 
}

const deleteOrdersItemByIdFromOrders = (accessToken, item) =>{
    try{
        axios.delete(`/api/user/orders/${item.order}/order-items/${item.id}/`,{
            headers: {"Authorization": `Bearer ${accessToken}`}
        })
        return getOrdersId(accessToken, item.order)
    } catch(error){
        console.error('Failed to post order from server:',error);
        return null;
    } 
}

const moreQuantity = (accessToken, item) =>{
    try{
        return axios.put(`/api/user/orders/${item.order}/order-items/${item.id}/`, {
                  "product": item.product,
                  "quantity": item.quantity + 1
        }, {
            headers: {"Authorization": `Bearer ${accessToken}`},
        });
    } catch(error){
        console.error('Failed to post order from server:',error);
        
    }
}

const lessQuantity = async (accessToken, item) =>{
    try{
        const response = await axios.put(`/api/user/orders/${item.order}/order-items/${item.id}/`, {
                  "product": item.product,
                  "quantity": item.quantity -1
        }, {
            headers: {"Authorization": `Bearer ${accessToken}`},
        });
        console.log('acxz',response);
        if (response.quantity > 0){
            return response;
        } else{
            deleteOrdersItemByIdFromOrders(accessToken, item);
            return getOrdersId(accessToken, item.order)
        }
    } catch(error){
        console.error('Failed to post order from server:',error);
        
    }
}

export {createOrders, 
    getOrdersList, 
    getOrdersId, 
    getOrdersItemByIdFromOrders, 
    getOrdersItemFromOrders, 
    deleteOrdersId, 
    deleteOrdersItemByIdFromOrders, 
    postOrdersItemByIdFromOrders, 
    postOrdersItemToOrders,
    moreQuantity,
    lessQuantity,
}