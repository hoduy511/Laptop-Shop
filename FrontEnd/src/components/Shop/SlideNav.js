import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import SlideNavSubMenu from './SlideNavSubMenu';

const SlideNav = ({ deleteFilter, resetFilter, onFilter, onCategorySelect, onFilterSelect, filter }) => {
  const [selectedCategory, setSelectedCategory] = useState({});
  const categories = useSelector((state) => state.products.categories);
  const [filters, setFilters] = useState(false);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState({});
  const [currentSubMenuCategory, setCurrentSubMenuCategory] = useState('');

  const submenuRef = useRef(null);

  const filterOptions = {
    hard_drive_type: ["SSD", "HDD"],
    hard_drive_capacity: ["256GB", "512GB", "1TB", "2TB", "4TB", "8TB", "16TB"],
    ram: ["4GB", "8GB", "16GB", "32GB", "64GB"],
    cpu: ["Intel Core i3", "Intel Core i5", "Intel Core i7", "AMD Ryzen 3", "AMD Ryzen 5", "AMD Ryzen 7"],
    screen_size: ["13 inch", "15 inch", "17 inch", "20 inch"],
    resolution: ["1920x1080", "2560x1440", "3840x2160", "7680x4320"],
    brand: ["Dell", "Apple", "Asus", "HP", "Lenovo", "MSI"]
  };

  const filterLabels = {
    hard_drive_type: "Loại ổ cứng",
    hard_drive_capacity: "Dung lượng ổ cứng",
    ram: "RAM",
    cpu: "CPU",
    screen_size: "Kích thước màn hình",
    resolution: "Độ phân giải",
    brand: "Nhãn hiệu"
  };

  const handleFilterSelect = (filterCategory, filterValue) => {
    setFilters({
      ...filters,
      [filterCategory]: filterValue
    });
    onFilter({
      filterCategory,
      filterValue
    });
    setIsSubMenuVisible((prev) => ({ ...prev, [filterCategory]: false }));
  };

  const handleCategoryClick = (categoryName) => {
    if (categoryName === selectedCategory) {
      setSelectedCategory('');
      onCategorySelect('');
    } else if (categoryName !== selectedCategory) {
      setSelectedCategory(categoryName);
      onCategorySelect(categoryName);
    }
  };

  const handleDeleteAllFilter = () => {
    resetFilter();
    setFilters({});
  };

  const handleDeleteFilter = (category) => {
    const newFilter = { ...filters };
    delete newFilter[category];
    setFilters(newFilter);
    deleteFilter(category);
  };

  const toggleSubMenu = (category) => {
    setIsSubMenuVisible((prev) => {
      const newVisibility = { ...prev };
      newVisibility[category] = !prev[category];

      // Close other submenus if they are open
      Object.keys(prev).forEach((key) => {
        if (key !== category) {
          newVisibility[key] = false;
        }
      });

      setCurrentSubMenuCategory(category);
      return newVisibility;
    });
  };

  return (
    <>
      <div className='slideNav'>
        <ul className='categories-option'>
          {categories &&
            categories.length > 0 &&
            categories.map((item, index) => (
              <li
                className={item.name === selectedCategory ? 'selected' : ''}
                key={index}
                onClick={() => {
                  handleCategoryClick(item.name);
                }}
              >
                {item.name}
              </li>
            ))}
        </ul>
        <div className='filter-option'>
          <h2>Chọn theo tiêu chí</h2>
          <div className='filter-container'>
            {Object.keys(filterOptions).map((category) => (
              <div key={category} className='menu-item'>
                <li onMouseEnter={() => toggleSubMenu(category)}>{filterLabels[category] || category}</li>
                {isSubMenuVisible[category] && (
                  <div className='submenu-wrapper' ref={submenuRef}>
                    <SlideNavSubMenu handleFilterSelect={handleFilterSelect} category={category} filterOptions={filterOptions} key={category} />
                  </div>
                )}
              </div>
            ))}
          </div>
          {Object.keys(filters).length > 0 && <h2>Đang Lọc Theo</h2>}
          <ul className="filtering">
            {Object.keys(filters).map((category) => (
              <li onClick={() => handleDeleteFilter(category)} key={category}>
                <i className="fa-solid fa-circle-xmark"></i>
                {filterLabels[category] || category}: {filters[category]}
              </li>
            ))}
          {Object.keys(filters).length > 0 && <li onClick={handleDeleteAllFilter}><i class="fa-solid fa-xmark"></i>Bỏ chọn tất cả</li>}
          </ul>
        </div>
        <div className='order-option'>
          <h2>Sắp xếp theo</h2>
          <ul className='filter'>
            <li onClick={() => onFilterSelect("PriceHighToLow")}>Giá Thấp - Cao</li>
            <li onClick={() => onFilterSelect("PriceLowToHigh")}>Giá Cao - Thấp</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SlideNav;
