import React, { useEffect, useContext } from 'react';
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const NavBar = ( props) => {
    let navigate = useNavigate();
    const {logout, user} = useContext(UserContext);


    useEffect(()=>{
        console.log('>>>check log from nav', props.isLoggedIn);
    })

    const handleLogout = () =>{
        if(user.auth){
        logout();
        navigate('/Laptop-Shop/');
        toast.success('Logout success!')
        } else{
        navigate('/Laptop-Shop/register');
        }
    }
    return (<>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container className='navbar-container'>
                <Navbar.Brand href="/Laptop-Shop/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/Laptop-Shop/shop">Shop</Nav.Link>
                    <Nav.Link href="/Laptop-Shop/abouts">Abouts</Nav.Link>
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
                    <Nav.Link href="/Laptop-Shop/cart">
                    <span><i class="fa-solid fa-cart-shopping"/></span>
                    </Nav.Link>
                    <Nav.Link className='menu-container' href={user.auth ? `/Laptop-Shop/${user.email}`:`/Laptop-Shop/login`}>
                            <span className='menu-trigger'><i class="fa-solid fa-user"/></span>
                            <div class="hover-menu">
                                <Nav.Link href={!user.auth ? `/Laptop-Shop/login`:`/Laptop-Shop/${user.email}`}>{!user.auth ? 'Đăng nhập':'Tài khoản'}</Nav.Link>
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