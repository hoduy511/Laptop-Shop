import axios from 'axios';
import { API_URL } from '../config/Config';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../store/reducers/userSlice';

const Checkout = () => {
    const accessToken = useSelector(selectAccessToken)
  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/user/payments/stripe/create-checkout-session/40/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // Thêm các headers khác nếu cần thiết
          },
        }
      );

      // Xử lý phản hồi từ server (response.data)
    } catch (error) {
      // Xử lý lỗi
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="container">
        <h1>Checkout</h1>
        <img src="https://i.imgur.com/EHyR2nP.png" className='image' alt="Product"></img>
        <h2>Price</h2>
        <h3>25$</h3>
        <button className="btn-checkout" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </>
  );
};

export default Checkout;
