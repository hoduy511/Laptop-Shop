import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import image from '../draw2.webp'

const NotFound = () => {
  return (
    <>
      <NavBar />
      <div className="container my-5 justify-content-center">
        <div className="row justify-content-center align-items-center">
          <h4 className="text-center mb-2 mb-sm-5">Page Not Found</h4>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            src={image}
            alt="Not-found"
          />
          <button className="col-md-3 col-sm-6 col-12 btn btn-success mt-5">
            <Link to="/" className="text-white text-decoration-none">
              Home page
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
