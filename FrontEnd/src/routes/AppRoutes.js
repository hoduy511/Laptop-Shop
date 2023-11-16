import { Routes, Route } from "react-router-dom";

import Home from '../components/Home';
import CartPage from "../components/Cart/CartPage";
import Shop from '../components/Shop/Shop';
import Login from '../components/Authentication/Login';
import Register from '../components/Authentication/Register';
import SingleProduct from "../components/Shop/SingleProduct";
import Abouts from "../components/About";
import VerifyEmailView from "../components/Authentication/VerifyEmailView";
import UserProfile from "../components/Authentication/UserProfile";
import NotFound from "../components/NotFound";
import FindAccount from "../components/Authentication/FindAccountView";
import CheckEmail from "../views/CheckEmail";
import ResetPasswordView from "../components/Authentication/ResetPassWordView";
import ChangingPassword from "../components/Authentication/ChangingPassword";
import PayHistory from "../components/Stripe/PayHistory";
import Success from "../components/Stripe/Success";
import Cancel from "../components/Stripe/Cancel";
import Checkout from "../components/Stripe/Checkout";

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
                <Route path='/user/change-password/' element={<ChangingPassword />} />
                <Route path='/password-reset/confirm/:uid/:token' element={<ResetPasswordView/>} />
          </Routes>
          </Elements>
        </>
    )
}

export default AppRouter;