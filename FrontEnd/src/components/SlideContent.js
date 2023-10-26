import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsFromApi, fetchIdProductFromApi } from '../store/reducers/productSlice';
import { fetchProducts, fetchIdProduct } from '../services/ProductService';

const SlideContent = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const products = useSelector((state) => state.products.products);
  const [products, setProducts] = useState();
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  // useEffect(() => {
  //   if (status === 'idle') {
  //     dispatch(fetchProductsFromApi());
  //   }
  // }, [status, dispatch]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    };
    getCategories();
  }, []);

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((item) => item.category === selectedCategory)
    : products;

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  const handleBuy = async (item) => {
    console.log('>>check item', item.id);
    const response = await fetchProducts(item.id);
    // dispatch(fetchIdProductFromApi(item.id));
    // Chuyển hướng đến trang thông tin sản phẩm dựa trên productName
    navigate(`/Laptop-Shop/shop/${item.name}`, {
      state: {
        product: response , 
      }
    });
  }

  const handleAddToCart = (item) => {
    
  }

  return (
    <>
      <div className='sliderContent'>
        <div className='Card'>
          {filteredProducts && filteredProducts.length > 0 &&
            filteredProducts.map((item, index) => {
              return (
                <div key={item.id} className='product-item'>
                  <img className='Card.Img' variant="top" src={item.image} alt={item.name} />
                  <div className='Card.Body'>
                    <div className='Card.Title'>{item.name}</div>
                    <div className='Card.Text'>
                      {item.price}
                    </div>
                    <Button variant="primary" onClick={() => handleBuy(item)}>Buy</Button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </>
  );
};

export default SlideContent;
