import React, { useEffect, useContext, useState } from 'react';
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';


const NavBar = ( props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const user = useSelector(state=>state.user.user);


    let navigate = useNavigate();


    const handleLogout  = () =>{
        dispatch(logout());
    }

    const renderAuthButton = () =>{
        if (isLoggedIn) {
            return (
              <Nav.Link as={Link} onClick={() =>handleLogout()}>Đăng xuất</Nav.Link>
            );
          } else {
            return (
              <Nav.Link as={Link} to={'/Laptop-Shop/register'}>Đăng ký</Nav.Link>
            );
          }
    }
    return (<>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container className='navbar-container'>
                <Navbar.Brand as={Link} to="/Laptop-Shop/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/Laptop-Shop/shop">Shop</Nav.Link>
                    <Nav.Link as={Link} to="/Laptop-Shop/abouts">Abouts</Nav.Link>
                </Nav>
                <Nav className='px-5'>
                    <Form className="d-flex" style={{width: '400px'}}>
                        <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2 w-100"
                        aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Nav>
                <Nav>
                    <Nav.Link to="/Laptop-Shop/cart">
                    <span><i class="fa-solid fa-cart-shopping"/></span>
                    </Nav.Link >
                    <Nav.Link as={Link} className='menu-container' to={!isLoggedIn ? `/Laptop-Shop/abouts`:`/Laptop-Shop/login`}>
                            <span className='menu-trigger'><i class="fa-solid fa-user"/></span>
                            <div class="hover-menu">
                                <Nav.Link as={Link} to={!isLoggedIn ? `/Laptop-Shop/login`:`/Laptop-Shop/abouts`}>{!isLoggedIn ? 'Đăng nhập':'Tài khoản'}</Nav.Link>
                                {renderAuthButton()}
                            </div>
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}

export default NavBar;