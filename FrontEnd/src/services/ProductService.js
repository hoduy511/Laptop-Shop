import axios from "./Customize-axios";

const fetchProducts = (products) => {
    return axios.get(`/products`)
    .then((response) => {
        console.log('Data from fetchProducts:', response); // Log dữ liệu ở đây
        return response;
      })
      .catch((error) => {
        throw error;
      });
}

const fetchCategories = (categories) => {
    return axios.get(`/products/categories`)
}

const fetchIdProduct = (id) =>{
    return axios.get(`/product/${id}/`)
}

export {fetchCategories, fetchProducts, fetchIdProduct};