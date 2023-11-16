import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAccessToken } from '../../store/slice/userSlice';
import { getOrdersId, getOrdersList } from '../../services/OrderService';
import { setTotalQuantity } from '../../store/slice/cartSlice';

function CartIcon() {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const getQuantity = async () =>{
    const orderList = await getOrdersList(accessToken);
    if (orderList && orderList.count !== 0){
      const pendingOrders = orderList.results.filter(order => order.status === "P");
      if (pendingOrders.length > 0) { 
        try{
          const orderId = await getOrdersId(accessToken, pendingOrders[0].id);
          const quantity = orderId.order_items.reduce((total, orderItem) => total + orderItem.quantity, 0)
          dispatch(setTotalQuantity(quantity));
        } catch(err){
        dispatch(setTotalQuantity(0));
        }
      } else {
        dispatch(setTotalQuantity(0));
      }
    } else {
      dispatch(setTotalQuantity(0));
    }
  }
  
  // Tính tổng quantity của tất cả sản phẩm trong giỏ hàng
  useEffect(()=>{
    if(isLoggedIn){
      getQuantity();
    } else{
      dispatch(setTotalQuantity(0));
    }
  },[totalQuantity, isLoggedIn])

  return (
    <div className="cart-icon">
      <span className="badge">{totalQuantity === 0 ? '': totalQuantity}</span>
    </div>
  );
}

export default CartIcon;
