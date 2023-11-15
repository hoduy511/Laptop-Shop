import React from "react";
import { Link } from "react-router-dom";
const Abouts = () => {
  return (
    <>
    <nav aria-label="breadcrumb" class="main-breadcrumb"
          style={{
            width: '80%',
            margin: ' 0 auto'
          }}
        >
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Abouts</li>
        </ol>
      </nav>
    </>
  );
};

export default Abouts;