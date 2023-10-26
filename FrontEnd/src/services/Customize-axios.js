import axios from "axios";
const BASE_URL='http://127.0.0.1:8000/';

const instance = axios.create({
    baseURL: BASE_URL
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('check response axios:',response);
    return response.data ? response.data : {statusCode : response.status};
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let response = {};
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      response.data= error.response.data;
      response.status= error.response.status;
      response.headers= error.response.headers;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser 
      // and an instance of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
    return response;
    // return Promise.reject(error);
  });

export default instance;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {"Content-Type": 'application/json'},
  withCredentials:true
})