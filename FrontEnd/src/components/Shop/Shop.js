import React, { useEffect, useState } from 'react';
import SlideNav from './SlideNav';
import { fetchProductsFromApi, fetchCategoriesFromApi } from '../../store/slice/productSlice';
import SlideContent from './SlideContent';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../assets/styles/Shop.scss';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterSelect, setFilterSelect] = useState('');
  const [filter, setFilter] = useState({});
  const dispatch = useDispatch();
  const productsStatus = useSelector(state => state.products.status);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchProductsFromApi());
    dispatch(fetchCategoriesFromApi());
    setLoading(false);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  
  const handleFilterSelect = (selectedFilter) => {
    setFilterSelect(selectedFilter);
  }

  const handleFilter = (Filter) =>{
    setFilter({
      ...filter,
      [Filter.filterCategory]: Filter.filterValue
    });
  }

  const handleResetFilter = () =>{
    setFilter({});
  }

  const handleDeleteFilter = (category) =>{
    const newFilter = {...filter};
    delete newFilter[category];
    setFilter(newFilter);
  }
  
  // Add any additional code for arranging the products here

  return (
    <>
      <nav aria-label="breadcrumb" class="main-breadcrumb"
      style={{
        width: '80%',
        margin: '0 auto'
      }}
      >
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Shop</li>
        </ol>
      </nav>
      <div className='slide-wrapper'>
        <SlideNav 
          onCategorySelect={handleCategorySelect}
          onFilterSelect={handleFilterSelect}
          onFilter={handleFilter}
          resetFilter={handleResetFilter}
          deleteFilter={handleDeleteFilter}
          filter={filter}
        />
        {!loading ? <SlideContent 
          selectedCategory={selectedCategory}
          filterSelect={filterSelect}
          filter={filter}
        />: null}
        
      </div>
    </>
  );
};

export default Shop;
