import { toast } from "react-toastify";
import { createOrders, getOrdersId, getOrdersList, moreQuantity, postOrdersItemToOrders } from "../services/OrderService";
import { plusQuantity, setTotalQuantity } from "../store/slice/cartSlice";
import { logout } from "../store/slice/userSlice";


export const handleAddToCart = async (isLoggedIn, accessToken, item, dispatch, navigate)=>{
    if(isLoggedIn){
      const response = await getOrdersList(accessToken, item);///Kiểm tra danh sách orders
      if (response && response.count === 0){
        createOrders(accessToken, item);//Chưa tồn tại orderid nào
        dispatch(setTotalQuantity(1));
        toast.success('Thêm sản phẩm thành công!');
      } else {
        const pendingOrders = response.results.filter(order => order.status === "P");
        console.log(pendingOrders);
        console.log(item);
        if (pendingOrders.length > 0) {
          try{
            const res = await postOrdersItemToOrders(accessToken, pendingOrders[0], item)//Chưa tồn tại sản phẩm
            console.log('>>>>',res);
            dispatch(plusQuantity(res.quantity));
            toast.success('Thêm sản phẩm thành công!');
          } catch(err){
            if(err.response && err.response.status === 400){ ///Đã tồn tại sản phẩm
              const orderDetails = await getOrdersId(accessToken, pendingOrders[0].id);
              const orderItem = orderDetails.order_items.find((orderItems) => orderItems.product === item.id);
              if(orderItem){
                  try{
                  await moreQuantity(accessToken, orderItem);
                  const orderId = await getOrdersId(accessToken, pendingOrders[0].id);
                  const quantity = orderId.order_items.reduce((total, orderItem) => total + orderItem.quantity, 0);
                  dispatch(setTotalQuantity(quantity));
                      toast.success('Thêm sản phẩm thành công!');
                } catch(err){
                  if(err.response && err.response.status === 400){
                    toast.warning('Đã hết hàng!');
                  }
                }
              }
            } else{
              console.error(err);
              dispatch(logout());
            }
          }
        } else{
          createOrders(accessToken, item);//Chưa tồn tại orderid nào
          dispatch(setTotalQuantity(1));
          toast.success('Thêm sản phẩm thành công!');
        }
      }
    } else {
      navigate('/login/');
    }
  }