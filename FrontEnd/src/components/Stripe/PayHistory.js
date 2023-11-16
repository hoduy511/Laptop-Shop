import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectAccessToken } from "../../store/slice/userSlice";
import { getOrdersList } from "../../services/OrderService";
import EmptyPayHistory from "./EmptyPayHistory";
import alt from '../../assets/image/draw2.webp';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip'
import { getUser } from "../../services/UserService";
import Modal from 'react-bootstrap/Modal';
import Rating from '../Shop/Rating';
import '../../assets/styles/PayHistory.scss';

const PayHistory = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const accessToken = useSelector(selectAccessToken);
    const products = useSelector((state) => state.products.products);
    const [orderItems, setOrderItems] = useState([]);
    const [orderId, setOrderId] = useState([]);
    const [data, setData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [orderProducts, setOrderProducts] = useState();
    const [avatar, setAvatar] = useState();
    const [email, setEmail] = useState();
    const [selectProduct, setSelectProduct] = useState();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        if (!isLoggedIn){
        navigate('/login/');
        } else {
        getOrders();
        getProducts();
        getUserData();
        const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
        delay(1000);
        }
    },[isLoggedIn])

    const getUserData = async () =>{
        try{
            const response = await getUser(accessToken);
            setEmail(response.email);
            setAvatar(response.profile.avatar);
            const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
            delay(1000);
        } catch(err){
            console.error(err);
        }
    }
    
    const getOrders = async () => {
        try {
        // Lấy danh sách đơn hàng
        const orderList = await getOrdersList(accessToken);
    
        if (orderList.count !== 0) {
            setIsEmpty(false);
            const completedOrders = orderList.results.filter(order => order.status !== "P");
            if (completedOrders.length > 0) {
            // Lấy mảng chứa tất cả các id từ completedOrders
            const orderIds = completedOrders.map(order => order.id);
            setOrderId(orderIds);
            const newOrderItems = completedOrders.reduce((acc, order) => {
                order.order_items.forEach(item => {
                    // Kiểm tra xem item đã tồn tại trong danh sách orderItems chưa
                    const existingItem = acc.find(existing => existing.id === item.id);
                    if (!existingItem) {
                        acc.push(item);
                    }
                });
                return acc;
            }, [...orderItems]); // Thêm các order items đã tồn tại vào danh sách mới
    
            // Cập nhật state orderItems với danh sách mới không có order item trùng lặp
            setOrderItems(newOrderItems);
            setData(completedOrders);
            } else {
            // Xử lý trường hợp không có đơn hàng hoàn thành
            }
        } else {
            setIsEmpty(true);
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };
    const getProducts = () =>{
        const seenProductIds = new Set();
        // Sử dụng map để tạo một mảng mới chứa thông tin sản phẩm, loại bỏ các sản phẩm trùng lặp
        let filteredProducts = orderItems.reduce((result, orderItem) => {
            const productId = orderItem.product.toString();
            const parsedProductId = parseInt(productId);

            // Kiểm tra xem sản phẩm đã tồn tại trong danh sách hay chưa
            if (!seenProductIds.has(parsedProductId)) {
                seenProductIds.add(parsedProductId); // Thêm id sản phẩm vào Set

                // Tìm và thêm thông tin sản phẩm vào mảng kết quả nếu chưa tồn tại
                const product = products.find(product => product.id === parsedProductId);
                if (product) {
                    result.push(product);
                }
            }

            return result;
        }, []);
        setOrderProducts(filteredProducts)
    }

    const handleTime = (time) =>{
        const date = new Date(time);
        const formattedDate = `${date.toLocaleTimeString()} ${date.toLocaleDateString('en-GB').replace(/\//g, '-')}`;
        return formattedDate;
    }

    const handleRate = (item) =>{
        setSelectProduct(item);
        handleShow();
    }

    const handleToProduct = (item)=>{
        const product = products.filter(p=>p.id === item.product);
        try{
            navigate(`/shop/${product[0].name}`);
        }catch(err){
            console.error(err);
        }
    }
    
    return (
        <>
        <nav aria-label="breadcrumb" class="main-breadcrumb"
      style={{
        width: '80%',
        margin: '0 auto'
      }}>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
          <li class="breadcrumb-item"><Link to={`/user/${email}`}>User</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Pay History</li>
        </ol>
      </nav>
            <div className="pay-history-container">
                <div className="">
                    <div class="row">
                    <div className="col-md-3">
                        {avatar && email &&
                        <div className="user">
                            <img width={50} height={50} src={avatar} alt=""/>
                            <div>
                                <div>{email}</div>
                                <Link to={`/user/${email}`}>Thông tin tài khoản</Link>
                            </div>
                        </div>}
                    </div>
                        <div class="col-md-9">
                        {data && data.length>0&&
                        data.map((item,index)=>{
                            return(
                                <div className="row">
                                    <div class="col-12 order-container">
                                        <section>
                                            <div className="row justify-content-between order-header">
                                                <div className="col text-start">Đơn hàng số {item.payment}</div>
                                                {item.status === "C" ? <div className="col text-end">{item.status === "C" && <div className="d-flex justify-content-end">
                                                    <span className="done">Đã thanh toán </span>
                                                    <OverlayTrigger
                                                placement="bottom"
                                                overlay={<Tooltip id="button-tooltip-2"><div>Cập nhật mới nhất<div>{handleTime(item.updated_at)}</div></div></Tooltip>}
                                                >
                                                {({ ref, ...triggerHandler }) => (
                                                    <div
                                                    {...triggerHandler}
                                                    className=""
                                                        ref={ref}
                                                    >
                                                        <i class="fa-solid fa-question"></i>
                                                    </div>
                                                )}
                                                </OverlayTrigger></div>}</div>:
                                                <div className="col not-done text-end">{item.status !== "C" && 'Chưa thanh toán'}</div>}
                                                
                                            </div>
                                        </section>
                                        <section className="order-items">
                                            {item.order_items && item.order_items.map((order_item, index)=>{
                                                const product = orderProducts.find(product => product.id === order_item.product);
                                                if(product){
                                                    return(
                                                        <div className="order-item">
                                                            <div className="order-item-info">
                                                                <img role="button" onClick={() =>handleToProduct(order_item)} width={100} height={100} alt="" src={product.image[0]?.image || alt}/> 
                                                                <div>
                                                                    <div role="button" onClick={() =>handleToProduct(order_item)} className="name">{product.name}</div>
                                                                    <div className="quantity">x{order_item.quantity}</div>
                                                                    <button onClick={() => handleRate(product)}>Đánh giá</button>
                                                                </div>
                                                            </div>
                                                            <div className="text-end">{order_item.cost}₫</div>
                                                            <hr/>
                                                        </div>
                                                    )
                                                } else if(!product){
                                                    getOrders();
                                                    getProducts();
                                                    return null;
                                                }
                                                
                                            })}
                                        </section>
                                        <div className="text-end">{item.total_cost}₫</div>
                                    </div>
                                    <div class="w-100"></div>
                                </div>
                            )
                        })}
                        </div>
                    </div>
                </div>
                {isEmpty && <EmptyPayHistory/>}
            </div>
            <Modal centered aria-labelledby="contained-modal-title-vcenter" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Đánh giá sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Rating 
                product={selectProduct}
                handleClose={handleClose}
                />
            </Modal.Body>
            </Modal>
        </>
    )
}

export default PayHistory;