import React, { useEffect, useContext } from 'react';
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const NavBar = ( props) => {
    let navigate = useNavigate();
    const {logout, user} = useContext(UserContext);



    const handleLogout = () =>{
        if(user.auth){
        logout();
        toast.success('Logout success!')
        navigate('/Laptop-Shop/')
        } else{
        navigate('/Laptop-Shop/register');
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
                    <Nav.Link as={Link} className='menu-container' to={user.auth ? `/Laptop-Shop/${user.email}`:`/Laptop-Shop/login`}>
                            <span className='menu-trigger'><i class="fa-solid fa-user"/></span>
                            <div class="hover-menu">
                                <Nav.Link as={Link} to={!user.auth ? `/Laptop-Shop/login`:`/Laptop-Shop/${user.email}`}>{!user.auth ? 'Đăng nhập':'Tài khoản'}</Nav.Link>
                                <Nav.Link onClick={()=>handleLogout()}>{!user.auth ? 'Đăng ký':'Đăng xuất'}</Nav.Link>
                            </div>
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}

export default NavBar;