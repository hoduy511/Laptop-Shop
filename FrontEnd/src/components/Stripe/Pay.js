import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAddress, logout, selectAccessToken } from "../../store/slice/userSlice";
import { getOrdersId, getOrdersList } from "../../services/OrderService";
import ReactLoading from 'react-loading';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from "react-router-dom";
import { getAddressList } from "../../services/UserService";
import stripe from '../../assets/image/stripe.png';
import paypal from '../../assets/image/paypal.png';
import { toast } from "react-toastify";
import { createPayment, putPaymentCheckout } from "../../services/PaymentService";
import axios from "axios";
import { API_URL } from "../../config/Config";

const Pay = () => {
    const isLoggedIn = useSelector(selectAccessToken);
    const accessToken = useSelector(selectAccessToken);
    const user = useSelector((state) => state.user.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [totalCost, setTotalCost] = useState(0);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [VAT, setVAT] = useState(1.1);
    const [orderId, setOrderId] = useState();
    const address = useSelector((state) => state.user.address);
    const [selectedAddress, setSelectedAddress] = useState({});
    const [show, setShow] = useState(false);
    const [paymentOption, setPaymentOption] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(()=>{
      if(isLoggedIn){
        getTotalCost();
      } else{
        setTotalCost(0);
      }
    },[totalQuantity]);

    const fetchData = async () =>{
      setLoadingData(true);
      if(isLoggedIn){
        try{
          const addressList = await getAddressList(accessToken);
          const filteredAddresses = addressList.results.filter(address => address.address_type !== '');
          dispatch(loadAddress(filteredAddresses));
        }catch(error){
          console.error('Lỗi khi lấy dữ liệu người dùng:', error);
          setLoadingData(false); // Đánh dấu rằng yêu cầu đã hoàn thành (có lỗi)
          logout();
        }
      } else {
        navigate("/login");
      }
      setLoadingData(false);
    }
    const handleCheckout = async (id) => {
      try {
        const response = await axios.post(
          `${API_URL}/api/user/payments/stripe/create-checkout-session/${id}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              // Thêm các headers khác nếu cần thiết
            },
          }
        );
  
        // Xử lý phản hồi từ server (response.data)
        window.location.href = response.data.paymentUrl;
        // console.log(response.data.paymentUrl);
      } catch (error) {
        // Xử lý lỗi
        console.error('Error:', error);
      }
    };

    const getTotalCost = async () =>{
      setLoading(true);
      const orderList = await getOrdersList(accessToken);
      if(orderList && orderList.count !== 0){
        const pendingOrders = orderList.results.filter(order => order.status === "P");
        if (pendingOrders.length > 0) {
          const orderIDRes = await getOrdersId(accessToken, pendingOrders[0].id);
          setOrderId(orderIDRes);
          setTotalCost(orderIDRes.total_cost);
        }
      }
      const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
      await delay(500);
      setLoading(false);
    }

    const handlePay = () =>{
      console.log(orderId);
      fetchData();
      if(loadingData === false){
        handleShow();
      }
    }

    const handleAddress = (e) =>{
      const filteredAddress = address.filter((product) => product.id == e);
      try{setSelectedAddress(filteredAddress);}
      catch(err){
        console.error(err);
      }
    }

    const handleStripe = () =>{
      toast.success('Đã chọn Stripe!')
      setPaymentOption('S');
    }

    const handlePaypal = () =>{
      toast.info('Đang phát triển!');
    }

    const handlePayment = async () =>{
      if(paymentOption && selectedAddress && paymentOption.length > 0){
        try{
          const response = await createPayment(accessToken, paymentOption, orderId.id);
          try{
            await putPaymentCheckout(accessToken, paymentOption, selectedAddress[0], orderId.id);
            const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
            await delay(800);
            handleCheckout(orderId.id)
          }catch(err){
            console.error('Lỗi từ payment:', err);
            try{
              handleCheckout(orderId.id);
            } catch(err){
              console.error(err);
            }
          }
        } catch(err){
          if(err.response.status === 400){
            try{
              console.log(selectedAddress);
              await putPaymentCheckout(accessToken, paymentOption, selectedAddress[0], orderId.id);
              const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
              await delay(800);
              handleCheckout(orderId.id);
            }catch(err){
              console.error('Lỗi từ payment2:', err);
              try{
                handleCheckout(orderId.id);
              } catch(err){
                console.error(err);
              }
            }
          }
        }
      } else if(paymentOption){
        toast.warning('Chưa chọn địa chỉ!');
      } else if(selectedAddress){
        toast.warning('Chưa chọn phương thức thanh toán!')
      }
    }

    return (
      <>
        <div className="pay-wrapper">
            <div className="pay-container">
                <div className="pay-header">Thanh toán</div>
                <div className="pay-body">
                    <div>
                        <div>Tổng tạm tính</div>
                        <div>{loading ? <ReactLoading type={'bubbles'} margin={'auto 0'} color={'gray'} height={15} width={15} /> : parseInt(totalCost).toLocaleString('en-US').replace(/,/g, '.')} ₫</div>
                    </div>
                    <div>
                      <div>Thành Tiền</div>
                      <div>{loading ? <ReactLoading type={'bubbles'} margin={'auto 0'} color={'gray'} lineheight={'16px'} height={15} width={15} /> : parseInt(totalCost*VAT).toLocaleString('en-US').replace(/,/g, '.')} ₫</div>
                    </div>
                </div>
                <button onClick={handlePay} variant="primary">Thanh Toán</button>
            </div>
        </div>
        <Modal centered aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-container">
            {address ? 'Chọn địa chỉ giao hàng:' : <Link to={`/user/${user.email}`}>Bạn chưa có địa chỉ!</Link>}
            <select name="Địa chỉ" onChange={(e) => handleAddress(e.target.value)} className="address-show">
              {address && address.length > 0 ? (
              address.map((address, index) => (
                <>
                  <option value={address.id}>{address.apartment_address} / {address.street_address} / {address.city} / {address.country}</option>
                </>
              ))
              ):(
                <div>
                  a
                </div>
              )}
            </select>
            <div>
              <span>Tổng thanh toán(Đã tính VAT):</span>
              <span>{(totalCost*VAT).toFixed(2)} ₫</span>
            </div>
            <div>
              <div>Chọn phương thức thanh toán</div>
              <div>
                <img onClick={handleStripe} src={stripe} width={80} height={80} alt=""/>
                <img onClick={handlePaypal} src={paypal} width={80} height={80} alt=""/>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePayment}>
            Pay
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  };
  
  export default Pay;