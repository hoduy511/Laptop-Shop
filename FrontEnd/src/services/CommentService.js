import axios from "./Customize-axios";

const getReviewList = () =>{
    try{
        return axios.get(`/api/products/reviews/`);
    }catch(err){
        console.error(err);
    }
}

const getReviewId = (accessToken, id) =>{
    try{
        return axios.get(`/api/products/reviews/${id}`,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
    }catch(err){
        console.error(err);
    }
}

const createReview = (accessToken, rating, cmt, product) =>{
    try{
        return axios.post(`/api/products/reviews/`,{
            rating: rating,
            comment: cmt,
            product: product
        },{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
    }catch(err){
        console.error(err);
    }
}

const putReview = (accessToken, rating, cmt, product, id) =>{
    try{
        return axios.put(`/api/products/reviews/${id}/`,{
            rating: rating,
            comment: cmt,
            product: product
        },{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
    }catch(err){
        console.error(err);
    }
}

const deleteReview = (accessToken, id) =>{
    try{
        return axios.put(`/api/products/reviews/${id}/`,{
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });
    }catch(err){
        console.error(err);
    }
}

export{
    getReviewId,
    getReviewList,
    deleteReview,
    createReview,
    putReview
}