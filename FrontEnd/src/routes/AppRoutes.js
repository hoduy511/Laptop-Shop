import { Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import Cart from '../components/Cart';
import Shop from '../components/Shop';
import Login from '../components/LoginForm';
import Register from '../components/RegistrationForm';
import Abouts from '../components/About';
import ProductList from "../components/DetailUser";
import SingleProduct from "../components/SingleProduct";

const AppRouter = () =>{

    return(
        <>
        <Routes>
            <Route path='/Laptop-Shop/' element={<Home />} exact/>
            <Route path='/Laptop-Shop/shop' element={<Shop />} />
            <Route path='/Laptop-Shop/cart' element={<Cart />} />
            <Route path='/Laptop-Shop/login' element={<Login />} />
            <Route path='/Laptop-Shop/register' element={<Register />} />
            <Route path='/Laptop-Shop/abouts' element={<ProductList />} />
            <Route path='/Laptop-Shop/shop/:title' element={<SingleProduct />} />
          </Routes>
        </>
    )
}

export default AppRouter;