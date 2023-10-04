import React, { useEffect, useState } from 'react';
import { fetchCategories} from '../services/ProductService';


const SliderNav = () => {
    const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetchCategories();
        setCategories(res);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    };
    getCategories();
  }, []);

  return(
    <>
    <ul className='sliderNav'>
        {categories && categories.length >0 && 
        categories.map((item,index)=>{
            return(
                <li key={index}>{item}</li>
            )
        })}
    </ul>
    </>
    )
};

export default SliderNav;
