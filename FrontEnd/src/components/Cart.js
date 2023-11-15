import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalQuantity } from '../store/reducers/cartSlice';
import { useNavigate } from 'react-router-dom';
import { selectAccessToken } from '../store/reducers/userSlice';
import {toast} from 'react-toastify';
import { deleteOrdersId, deleteOrdersItemByIdFromOrders, getOrdersId, getOrdersList, lessQuantity, moreQuantity } from '../services/OrderService';
import alt from '../draw2.webp';

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const products = useSelector((state) => state.products.products);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const accessToken = useSelector(selectAccessToken);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if (!isLoggedIn){
      navigate('/login/');
    } else {
      getOrders();
    }
  },[isLoggedIn])

  const getOrders = async () => {
    try {
      // Lấy danh sách đơn hàng
      const orderList = await getOrdersList(accessToken);
      console.log('orderList:', orderList);
      if (orderList.count !== 0) {
        // Lọc danh sách đơn hàng với trạng thái "P" (Pending)
        const pendingOrders = orderList.results.filter(order => order.status === "P");
        if (pendingOrders.length > 0) {
          // Lấy thông tin đơn hàng đầu tiên (hoặc đơn hàng cụ thể bạn muốn lấy)
          const orderId = pendingOrders[0].id;
          const orderDetails = await getOrdersId(accessToken, orderId);
          setOrderItems(orderDetails.order_items);
          setOrderId(orderDetails.id);
  
          // Lấy danh sách sản phẩm từ dữ liệu đơn hàng
          const productsInCart = orderDetails.order_items.map((orderItem) => {
            // Tìm thông tin sản phẩm từ danh sách sản phẩm (sử dụng product id)
            const product = products.find((p) => p.id === orderItem.product);
            if (product) {
              return {
                id: product.id,
                name: product.name, // Tên sản phẩm từ danh sách sản phẩm
                price: product.price, // Giá sản phẩm từ danh sách sản phẩm
                quantity: orderItem.quantity,
              };
            }
            return null; // Xử lý trường hợp sản phẩm không tồn tại
          });
  
          const filteredProductsInCart = productsInCart.filter((product) => product.quantity > 0);
          const quantity = filteredProductsInCart.reduce((total, orderItem) => total + orderItem.quantity, 0);
          dispatch(setTotalQuantity(quantity));
          // Cập nhật danh sách giỏ hàng
          setCartItems(filteredProductsInCart);
          setCartProducts(products.filter(products => cartItems.some(product => product.id === products.id)));
        } else {
          dispatch(setTotalQuantity(0));
          setCartItems([]);
          setCartProducts([]);
        }
      } else {
        dispatch(setTotalQuantity(0));
        setCartItems([]);
        setCartProducts([]);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRemoveItem = async (event) =>{
    setLoadingDelete(true);
    try{
      const item = orderItems.find((orderItems) => orderItems.product === event.id);
        await deleteOrdersItemByIdFromOrders(accessToken, item)
        const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== event.id);
        setCartItems(updatedCartItems);
        const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
        await delay(800);
        getOrders();
        toast.success('Xóa sản phẩm thành công!');
      } catch(err){ 
        const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
        await delay(800);
        getOrders();
        toast.warning('Chậm lại nào!');
    }
    setLoadingDelete(false);
  }
  const handleMoreQuantity = async (event) =>{
    const item = orderItems.find((orderItems) => orderItems.product === event.id);
    try{
      await moreQuantity(accessToken, item)
      getOrders();
    } catch(err){
      if(err.response.status === 400){
        toast.warning('Đã hết hàng!');
      }
    }
  }
  const handleLessQuantity = async (event) =>{
    const item = orderItems.find((orderItems) => orderItems.product === event.id);
    if(item.quantity > 1){
      try{
        await lessQuantity(accessToken, item)
        getOrders();
      } catch(err){
        if(err.response.status === 400){
        }
      }
    } else {

    }
  }

  const handleClearCart = async () =>{
    try{
      setLoading(true);
      await deleteOrdersId(accessToken, orderId);
      getOrders();
      setLoading(false);
      toast.success('Xóa cart thành công!');
    } catch(err){
      getOrders();
      toast.warning('Nothing in cart!')
    }
  }

  return (
    <div className="cart-page">
      <div className="cart-title">
        <h2>Your Bag</h2>
        <h5>{cartItems.length === 0 ? '' : `${cartItems.length} item`}</h5>
      </div>
      <div className="cart-table-wrapper">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {cartItems.map((item) => {
          const product = products.find((product) => product.id === item.id);
          const image = product ? (product.image[0] ? product.image[0].image : alt) : alt;

          return (
            <>
              <tr key={item.id}>
                {console.log(product)}
                <td className='product-cell'><div className='product-info'>
                <div>{product ? <img src={image} alt={product.name} /> : 'N/A'}</div>
                <span>{product ? product.name : 'Product Not Found'}</span>
                </div></td>
                <td>${product ? product.price : 'N/A'}</td>
                <td>
                  <button style={{ color: item.quantity === 1 ? '#333' : null }} onClick={() => handleLessQuantity(item) }><i class="fa-solid fa-minus"></i></button>
                  {item.quantity}
                  <button onClick={() => handleMoreQuantity(item)}><i class="fa-solid fa-plus"></i></button>
                </td>
                <td>
                  <td>${product ? product.price * item.quantity : 'N/A'}</td>
                </td>
                <td>
                  <button onClick={() => handleRemoveItem(item) } disabled={loadingDelete}><i className="fa-solid fa-trash"></i></button>
                </td>
              </tr>
              <hr style={{ color: "#fff" }} />
            </>
          );
        })}
        </tbody>
      </table>
      </div>
      <div className='cart-actions'>
        <button className='clear-cart' onClick={() => handleClearCart()} >
          {loading ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Clear Cart'}</button>
      </div>
    </div>
  );
}

export default Cart;
