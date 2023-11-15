import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../store/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import logo from '../logo.webp'
import CartIcon from './CartQuantity';
import SearchBar from './SearchBar';


const NavBar = ( props) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const user = useSelector(state=>state.user.user);


    const [collapseOpen, setCollapseOpen] = useState(false);
    const [collapseUserOpen, setCollapseUserOpen] = useState(false);

    let navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      if(!collapseUserOpen){
        setCollapseOpen(false);
      }
      }, [location]);

    const handleLogout  = () =>{
        dispatch(logout());
    }
    
    const handleMenuClick = () =>{
      setCollapseUserOpen(false);
      setCollapseOpen(false);
    }

    const renderAuthButton = () =>{
        if (isLoggedIn) {
            return (
              <Nav.Link as={Link} onClick={() =>handleLogout()} to={'/'}>Đăng xuất</Nav.Link>
            );
          } else {
            return (
              <Nav.Link as={Link} onClick={() => handleMenuClick()} to={'/register'}>Đăng ký</Nav.Link>
            );
          }
    }


    
    return (<>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar-all" expanded={collapseOpen}>
            <Container className='navbar-container'>
                <Navbar.Brand as={Link} to="/"><img className='logo' src={logo} alt='logo'/>Laptop Shop</Navbar.Brand>
                <SearchBar/>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={() => setCollapseOpen(!collapseOpen)} />
                <Navbar.Collapse id="responsive-navbar-nav" >
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/shop">Danh Mục Sản Phẩm</Nav.Link>
                    <Nav.Link as={Link} to="/abouts">Thông Tin</Nav.Link>
                </Nav>
                
                <Nav>
                    <Nav.Link as={Link} className='cart-container' to="/cart">
                      <span><i className="fa-solid fa-cart-shopping cart-fa"/><CartIcon/>{collapseOpen ? 'Cart': ''}</span>
                    </Nav.Link >
                    <Nav.Link className='menu-container'>
                            <span className='menu-trigger'><i class="fa-solid fa-user" onClick={() => setCollapseUserOpen(!collapseUserOpen)}/>{collapseOpen ? 'User': ''}</span>
                            <div class="hover-menu">
                            <Nav.Link as={Link} onClick={() => handleMenuClick()} to={!isLoggedIn ? `/login`:(isLoggedIn ? `/user/${user.user ? user.user.email : 'null'}` : `/login`)}>{!isLoggedIn ? 'Đăng nhập':'Tài khoản'}</Nav.Link>
                            {isLoggedIn ? <Nav.Link as={Link} to={'/user/payhistory'}>Đơn mua</Nav.Link> : null}
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