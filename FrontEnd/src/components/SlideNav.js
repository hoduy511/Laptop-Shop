import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../services/ProductService';

const SliderNav = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
      }
    };
    getCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    if (categoryName === selectedCategory) {
      setSelectedCategory('');
      onCategorySelect(''); // Truyền danh mục rỗng lên component cha
    } else {
      setSelectedCategory(categoryName);
      onCategorySelect(categoryName); // Truyền danh mục đã chọn lên component cha
    }
  };

  return (
    <>
      <ul className='sliderNav'>
        {categories &&
          categories.length > 0 &&
          categories.map((item, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  handleCategoryClick(item.name);
                }}
                className={item.name === selectedCategory ? 'selected' : ''}
              >
                {item.name}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default SliderNav;
