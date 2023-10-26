import axios from "./Customize-axios";

const fetchProducts = () => {
    return axios.get(`/api/products/`)
    .then((response) => {
        console.log('Data from fetchProducts:', response); // Log dữ liệu ở đây
        return response.results;
      })
      .catch((error) => {
        throw error;
      });
}

const fetchCategories = () => {
    return axios.get(`/api/products/categories/`)
    .then((response) => {
      console.log('Data from fetchCategories:', response); // Log dữ liệu ở đây
      return response.results;
    })
    .catch((error) => {
      throw error;
    });
}

const fetchIdProduct = (id) =>{
    console.log('check id from service:', id)
    return axios.get(`/api/products/${id}/`)
    .then((response) => {
      console.log('Data from fetchIdProduct:', response); // Log dữ liệu ở đây
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export {fetchCategories, fetchProducts, fetchIdProduct};