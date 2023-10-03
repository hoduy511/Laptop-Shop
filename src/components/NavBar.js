import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NavBar = (props) => {
    return (<>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
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
                    <Nav.Link href="/Laptop-Shop/login">
                    <span><i class="fa-solid fa-user"/></span>
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}

export default NavBar;