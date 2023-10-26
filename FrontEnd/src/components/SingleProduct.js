import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {fetchIdProduct} from '../services/ProductService';

const SingleProduct = () => {
  const location = useLocation();
  const [product, setProduct] = location.state?.product;


  if (!product) {
      
      return <div>Loading...</div>
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Description: {product.desc}</p>
      {/* Hiển thị các thông tin khác của sản phẩm tại đây */}
    </div>
  )
}

export default SingleProduct;