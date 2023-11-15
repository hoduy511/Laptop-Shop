import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchIdProductFromApi } from '../store/reducers/productSlice';
import { selectAccessToken } from '../store/reducers/userSlice';
import { handleAddToCart } from '../utils/addToCartUtils';
import Fancybox from './FancyBox';
import alt from '../draw2.webp'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';

const ProductDetail = () => {
  const { item_name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const selectedProduct = useSelector((state) => state.products.selectedProduct);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const accessToken = useSelector(selectAccessToken);
  // Tìm sản phẩm dựa trên tên
  const product = products.find((p) => p.name === item_name);

  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true);
    if(product && selectedProduct){
      if(selectedProduct.id === product.id){
        dispatch(fetchIdProductFromApi(product.id));
      }
    }else if(product && !selectedProduct){
      dispatch(fetchIdProductFromApi(product.id));
    }
    setLoading(false);
  },[product, isLoggedIn])

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {status.error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCartInComponent = async (item) => {
    await handleAddToCart(isLoggedIn, accessToken, item, dispatch, navigate);
  };

  const handleZaloChatClick = () =>{
    const zaloChatLink = 'https://chat.zalo.me/?phone=0332649498';
    window.open(zaloChatLink, '_blank');
  }

  const handleCallClick = () =>{
    const phoneLink = "tel:0332649498";
    window.open(phoneLink, '_blank');
  }

  return (
    <>
      <nav aria-label="breadcrumb" class="main-breadcrumb"
        style={{
          width: '90%',
          margin: '0 auto'
        }}
        >
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
          <li class="breadcrumb-item"><Link to='/shop'>Shop</Link></li>
          <li class="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav>
      <div className='single-product-container'>
        <div className="row gutters-sm">
            {/* Left Column */}
          <div className="col-md-5 mb-3">
          <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <Swiper
          loop={true}
          navigation={true}
          modules={[Navigation, Thumbs]}
          grabCursor={true}
          thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
          className='product-images-slider'
        >
            {product && 
            product.image.map((item, index) =>{
              return(
                <>
                  <SwiperSlide key={index}>
                    <a href={item.image} data-fancybox="gallery" data-caption={item.caption}>
                      {!loading ? (<img src={item.image} alt=''/>) : <img className='alt' src={alt} width={246} height={246} alt=''></img>}
                    </a>
                  </SwiperSlide>
                </>
              )
            })}
        </Swiper>
            </Fancybox>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          modules={[Navigation, Thumbs]}
          className='product-images-slider-thumbs'
        >
            {product && 
            product.image.map((item, index) =>{
              return(
                <>
                  <SwiperSlide key={index}>
                    <div className='product-images-slider-thumbs-wrapper'>
                    {!loading ? (<img src={item.image} alt=''/>) : <img className='alt' src={alt} alt=''></img>}
                    </div>
                  </SwiperSlide>
                </>
              )
            })}
        </Swiper>
        </div>

        <div className="col-md-4">
            <div className='detail'>
              <h4>{product.name}</h4>
              <div className='text'>Trạng thái: {product.quantity > 0 ? 'Còn hàng' : 'Hết hàng'}</div>
              <div className='text'>Giá bán: <span>{parseInt(product.price).toLocaleString('en-US').replace(/,/g, '.')}₫</span></div>
              <div className='specifications'>
                <h6>Thông số kỹ thuật</h6>
                <div className="container">
                  <div className='row w-100 specifications-detail'>
                    <div>
                      <span>Loại card đồ họa</span>
                      <span>{product.graphics_card}</span>               
                    </div>
                    <div>            
                      <span>Dung lượng RAM</span>
                      <span>{product.ram}</span>
                    </div>
                    <div>        
                      <span>Ổ cứng</span>
                      <span> {product.hard_drive_capacity} {product.hard_drive_type}</span>
                    </div>
                    <div>           
                      <span>Loại CPU</span>
                      <span>{product.cpu}</span>
                    </div>
                    <div>          
                      <span>Kích thước màn hình</span>
                      <span>{product.screen_size}</span>
                    </div>
                    <div>
                      <span>Độ phân giải màn hình</span>
                      <span>{product.resolution}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row btn-container">
                <button type="button" onClick={handleZaloChatClick} class="col chat-btn"><div>Chat Zalo</div><div>0332.649.498</div></button>
                <button type="button" onClick={handleCallClick} class="col call-btn"><div>Gọi ngay</div><div>0332.649.498</div></button>
                <div class="w-100"></div>
                <button type="button" onClick={() => handleAddToCartInComponent(product)} class="col buy-btn "><div>Mua ngay</div><div>Giao hàng COD Miễn Phí Toàn Quốc</div></button>
            </div>
            
            </div>
        </div>
        <div className="col-md-3 warranty-wrapper">
            <div className='warranty-container'>
              <h6>Chi Tiết Sản Phẩm - Cam Kết</h6>
              <div className='warranty'>
                <i class="fa-solid fa-dollar-sign fa-xl"></i>
                <div>
                  <h5>Giá tốt nhất</h5>
                  <h8>Cam kết giá tốt nhất cho khách hàng</h8>
                </div>
              </div>
              <div className='warranty'>
                <i class="fa-solid fa-medal fa-xs"></i>
                <div>
                  <h5>Bảo hành</h5>
                  <h8>Cam kết bảo hành chính hãng</h8>
                </div>
              </div>
              <div className='warranty'>
                <i class="fa-solid fa-rotate fa-xs"></i>
                <div>
                  <h5>Chính sách đổi trả</h5>
                  <h8>Đổi trả dễ dàng những sản phẩm bị lỗi</h8>
                </div>
              </div>
              <div className='warranty'>
                <i class="fa-solid fa-truck fa-2xs"></i>
                <div>
                  <h5>Giao hàng đảm bảo</h5>
                  <h8>Giao hàng tại nhà</h8>
                </div>
              </div>
              <div className='showroom'>
                <h5>SHOWROOM</h5>
                <div>
                  <i class="fa-solid fa-location-dot"></i>
                  <span>{' '}Địa chỉ: 70, Tô Ký, P. Tân Chánh Hiệp, Ho Chi Minh City, Vietnam</span>
                </div>
                <div>
                  <i class="fa-solid fa-phone"></i>
                  <span>{' '}Hotline: 0332.649.498</span>
                </div>
                <div>
                <i class="fa-solid fa-headset"></i>
                  <span>{' '}Hotline kỹ thuật: 0332.649.498</span>
                </div>
                <div>
                  <i class="fa-regular fa-envelope"></i>
                  <span>{' '}Email: 2051120259@ut.edu.vn</span>
                </div>
                <div>
                  <i class="fa-solid fa-link"></i>
                  <span>{' '}Website: www.2051120259.com</span>
                </div>
              </div>
            </div>
        </div>
        </div>
        <div className='row gutters-sm desc-container'>
            <div className='col-md-9 desc'>
              <h3><strong>{product.name} - Thiết kế nhỏ gọn, hiệu năng mạnh mẽ</strong></h3>
              <div>{product.desc}</div>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
