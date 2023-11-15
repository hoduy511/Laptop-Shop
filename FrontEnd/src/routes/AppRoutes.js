import { Routes, Route } from "react-router-dom";

import Home from '../components/Home';
import CartPage from "../components/CartPage";
import Shop from '../components/Shop';
import Login from '../components/LoginForm';
import Register from '../components/RegistrationForm';
import SingleProduct from "../components/SingleProduct";
import Abouts from "../components/About";
import VerifyEmailView from "../views/VerifyEmailView";
import UserProfile from "../components/UserProfile";
import NotFound from "../components/NotFound";
import FindAccount from "../views/FindAccountView";
import CheckEmail from "../views/CheckEmail";
import ResetPasswordView from "../views/ResetPassWordView";
import PayHistory from "../components/PayHistory";
import Success from "../components/Success";
import Cancel from "../components/Cancel";

import Checkout from "../components/Checkout";

import { REACT_APP_STRIPE_KEY } from '../config/Config';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from "@stripe/stripe-js/pure"
const stripe_key = REACT_APP_STRIPE_KEY
const stripePromise = loadStripe(stripe_key)


const AppRouter = () =>{

    return(
        <>   
        <Elements stripe={stripePromise} >
        <Routes basename='/'>
                <Route path='/' element={<Home />} exact/>
                <Route path='/shop' element={<Shop />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/shop/:item_name' element={<SingleProduct />} />
                <Route path='/user/:email' element={<UserProfile />} />
                <Route path='/abouts' element={<Abouts />} />
                <Route path='/email/confirm/:key' element={<VerifyEmailView />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/login/identify' element={<FindAccount />} />
                <Route path='/login/identify/:email' element={<CheckEmail />} />
                <Route path='/user/payhistory' element={<PayHistory />} />
                <Route path='/checkout/success/' element={<Success />} />
                <Route path='/checkout/failed/' element={<Cancel />} />
                <Route exact path='checkout/' index element={<Checkout />} />
                <Route path='/password-reset/confirm/:uid/:token' element={<ResetPasswordView/>} />
          </Routes>
          </Elements>
        </>
    )
}

export default AppRouter;