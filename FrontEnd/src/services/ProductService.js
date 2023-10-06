import axios from "./Customize-axios";

const fetchProducts = (products) => {
    return axios.get(`/products`)
}

const fetchCategories = (categories) => {
    return axios.get(`/products/categories`)
}

const fetchIdProduct = (id) =>{
    return axios.get(`/product/${id}/`)
}

export {fetchCategories, fetchProducts, fetchIdProduct};