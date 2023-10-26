import React, { useState } from 'react';
import SlideNav from './SlideNav';
import SlideContent from './SlideContent';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='slide-wrapper'>
      <SlideNav onCategorySelect={handleCategorySelect} />
      <SlideContent selectedCategory={selectedCategory} />
    </div>
  );
};

export default Shop;
