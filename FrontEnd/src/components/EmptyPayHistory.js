import { useNavigate } from "react-router-dom";

const EmptyPayHistory = () =>{
    const navigate = useNavigate();
    
    const handleShopping = () =>{
        navigate('/shop/')
    }

    return(
        <div className="nothing-show-container">
            <i class="fa-regular fa-face-frown"></i>
            <div className="text">Bạn chưa có đơn hàng nào</div>
            <button className="btn btn-primary btn-lg" onClick={handleShopping}>Shopping</button>
        </div>
    )
}

export default EmptyPayHistory;