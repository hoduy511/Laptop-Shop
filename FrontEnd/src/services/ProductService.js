import axios from "./Customize-axios";

const fetchProducts = (products) => {
    return axios.get(`/products`)
}

const fetchCategories = (categories) => {
    return axios.get(`/products/categories`)
}

export {fetchCategories, fetchProducts};