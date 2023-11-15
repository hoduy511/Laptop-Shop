import Cart from './Cart';
import Pay from './Pay';
import EmptyCart from './EmptyCart';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js'

const CartPage = () => {
    const totalQuantity = useSelector((state) => state.cart.totalQuantity)

  return (
    <>
      <nav aria-label="breadcrumb" class="main-breadcrumb"
          style={{
            width: '80%',
            margin: ' 0 auto'
          }}
        >
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Cart</li>
        </ol>
      </nav>
      <div className='cardpage-wrapper'>
          {totalQuantity === 0 ? <EmptyCart/>:
          <>
              <Cart/>
                <Pay/>
          </>}
      </div>
    </>
  );
};

export default CartPage;