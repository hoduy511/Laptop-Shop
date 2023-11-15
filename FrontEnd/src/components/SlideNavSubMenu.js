import React from "react";

const SlideNavSubMenu = ({ category, filterOptions, handleFilterSelect }) => {
  const data = filterOptions[category] || [];

    const handleClick = (data) =>{
        handleFilterSelect(category, data);
    }

  return (
      <div className="submenu">
        <ul className="submenu-container">
          {data.map((data) => (
            <li className="submenu-btn" onClick={() => handleClick(data)} key={data}>{data}</li>
          ))}
        </ul>
      </div>
  );
};

export default SlideNavSubMenu;
