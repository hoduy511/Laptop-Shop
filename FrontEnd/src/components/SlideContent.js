import React, {useState, useEffect} from 'react';
import { fetchProducts } from '../services/ProductService';
import Button from 'react-bootstrap/Button';

const SlideContent = () => {
    const [Products, setProducts] = useState([]);

    useEffect(() => {
      const getProducts = async () => {
        try {
          const res = await fetchProducts();
          setProducts(res);
          console.log('check res', res);
        } catch (error) {
          console.error('Lỗi khi tải danh mục:', error);
        }
      };
      getProducts();
    }, []);

  return (
  <>
    <div className='sliderContent'>
        <div className='Card'>
        {Products && Products.length>0 && 
        Products.map((item, index)=>{
            return(
                <div className='product-item'>
                    <img className='Card.Img' variant="top" src={item.image} alt={item.title}/>
                    <div className='Card.Body'>
                        <div className='Card.Title'>{item.title}</div>
                        <div className='Card.Text'>
                        {item.price}
                        </div>
                        <Button variant="primary">Go somewhere</Button>
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
