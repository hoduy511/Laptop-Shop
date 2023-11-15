import axios from "./Customize-axios";

const fetchProducts = () => {
    return axios.get(`/api/products/`)
    .then((response) => {
        return response.results;
      })
      .catch((error) => {
        throw error;
      });
}

const fetchCategories = () => {
    return axios.get(`/api/products/categories/`)
    .then((response) => {
      return response.results;
    })
    .catch((error) => {
      throw error;
    });
}

const fetchIdProduct = (id) =>{
    return axios.get(`/api/products/${id}/`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export {fetchCategories, fetchProducts, fetchIdProduct};