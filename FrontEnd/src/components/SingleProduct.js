import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectProduct } from '../store/reducers/productSlice';

const SingleProduct = () => {
  const { productName } = useParams();
  const selectedProduct = useSelector((state) => state.products.selectedProduct);
  const dispatch = useDispatch();

  useEffect(() =>{
    if (!selectedProduct){
      const productFromLocalStorage = JSON.parse(localStorage.getItem('reduxState'));
      if (productFromLocalStorage) {
        const productToSelect = productFromLocalStorage.products.selectedProduct;
        dispatch(selectProduct(productToSelect));
        console.log('Đã cập nhật:', productToSelect);
      }

    }
  }, [dispatch, selectedProduct])

  if (!selectedProduct) {
    return <div>Không tìm thấy sản phẩm</div>;
  }

  return (
    <div>
      <h2>Chi tiết sản phẩm: {selectedProduct.title}</h2>
      <img src={selectedProduct.image} alt={selectedProduct.title} />
      <p>Price: ${selectedProduct.price}</p>
      <p>Mô tả: {selectedProduct.description}</p>
      {/* Hiển thị thông tin chi tiết khác của sản phẩm */}
    </div>
  );
};

export default SingleProduct;