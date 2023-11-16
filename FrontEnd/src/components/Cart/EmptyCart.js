import { useNavigate } from "react-router-dom";

const EmptyCart = () =>{
    const navigate = useNavigate();
    
    const handleShopping = () =>{
        navigate('/shop/')
    }

    return(
        <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>Add some products to your cart and start shopping!</p>
            <button onClick={handleShopping}>Shopping</button>
        </div>
    )
}

export default EmptyCart;