import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const { productName } = useParams();
  const selectedProduct = useSelector((state) => state.products.selectedProduct);

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