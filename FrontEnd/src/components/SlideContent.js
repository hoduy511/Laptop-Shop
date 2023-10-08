import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsFromApi, selectProduct } from '../store/reducers/rootReducers';


const SlideContent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
      if (status === 'idle') {
        dispatch(fetchProductsFromApi());
      }
    }, [status, dispatch]);

    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }

    const handleBuy = (item) =>{
      console.log('>>check item', item);
      dispatch(selectProduct(item));
      // Chuyển hướng đến trang thông tin sản phẩm dựa trên productName
      navigate(`/Laptop-Shop/shop/${item.title}`);
    }

  return (
  <>
    <div className='sliderContent'>
        <div className='Card'>
        {products && products.length>0 && 
        products.map((item, index)=>{
            return(
                <div key={item.id} className='product-item'>
                    <img className='Card.Img' variant="top" src={item.image} alt={item.title}/>
                    <div className='Card.Body'>
                        <div className='Card.Title'>{item.title}</div>
                        <div className='Card.Text'>
                        {item.price}
                        </div>
                        <Button variant="primary" onClick={()=>handleBuy(item)}>Buy</Button>
                    </div>
                </div>
                )
        })}
        </div>
    </div>
  </>
  )
};

export default SlideContent;
