import { Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import Cart from '../components/Cart';
import Shop from '../components/Shop';
import Login from '../components/LoginForm';
import Register from '../components/RegistrationForm';
import ProductList from "../components/ProductList";
import SingleProduct from "../components/SingleProduct";
import UserDetails from "../components/UserDetails";
import Abouts from "../components/About";
import MyComponent from "../components/MyComponent";

const AppRouter = () =>{

    return(
        <>
        <Routes basename='/Laptop-Shop/'>
            <Route path='/Laptop-Shop/' element={<Home />} exact/>
            <Route path='/Laptop-Shop/shop' element={<Shop />} />
            <Route path='/Laptop-Shop/cart' element={<Cart />} />
            <Route path='/Laptop-Shop/login' element={<Login />} />
            <Route path='/Laptop-Shop/register' element={<Register />} />
            <Route path='/Laptop-Shop/abouts' element={<MyComponent />} />
            <Route path='/Laptop-Shop/shop/:title' element={<SingleProduct />} />
            <Route path='/Laptop-Shop/:email' element={<UserDetails />} />
          </Routes>
        </>
    )
}

export default AppRouter;