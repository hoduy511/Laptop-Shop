import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchIdProductFromApi } from '../../store/slice/productSlice';
import { selectAccessToken } from '../../store/slice/userSlice';
import { handleAddToCart } from '../../utils/addToCartUtils';
import Fancybox from './FancyBox';
import alt from '../../assets/image/draw2.webp'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { getReviewList, putReview } from '../../services/CommentService';
import { FaStar } from 'react-icons/fa';
import '../../assets/styles/SingleProduct.scss';

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
  const user = useSelector((state) => state.user.user.user);
  const [thumbsSwiper, setThumbsSwiper] = useState();
  const [loading, setLoading] = useState(false);
  const [reviewProduct, setReviewProduct] = useState();
  const [writer, setWriter] = useState();
  const [isChange, setIsChange] = useState(-1);
  const [textValue, setTextValue] = useState();
  const [hover, setHover] = useState(null);
  const [rating,setRating] = useState(1);
  const [average,setAverage] = useState(0);
  const handleChange = (event) => {
    setTextValue(event.target.value);
};

  useEffect(()=>{
    setLoading(true);
    if(product && selectedProduct){
      if(selectedProduct.id === product.id){
        dispatch(fetchIdProductFromApi(product.id));
      }
    }else if(product && !selectedProduct){
      dispatch(fetchIdProductFromApi(product.id));
    }
    getReview();
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

  const getReview = async () =>{
    if(user){setWriter(user.first_name + ' ' + user.last_name);}
    try{
      const review = await getReviewList();
      const filteredReview = review.results.filter(p => p.product === product.id);
      const totalRatings = filteredReview.reduce((accumulator, review) => accumulator + review.rating, 0);
      if((totalRatings / filteredReview.length) > 0){
        setAverage(totalRatings / filteredReview.length);
      }
      setReviewProduct(filteredReview);
    } catch(err){
      console.error(err);
    }
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

  const handleTime = (time) =>{
    const date = new Date(time);
    const formattedDate = `${date.toLocaleTimeString()} ${date.toLocaleDateString('en-GB').replace(/\//g, '-')}`;
    return formattedDate;
}

  const handleChangeCmt = (index) =>{
    setIsChange(index);
  }

  const handleCancelChangeCmt = () =>{
    setIsChange(-1);
  }

  const handleRating = async () =>{
    const writer = user.first_name + ' '+ user.last_name;
    try{
    const reviewList = await getReviewList();
    console.log('list', reviewList);
    const selectReviewsId = reviewList.results.filter(p => p.writer === writer && p.product == product.id);
    console.log('aa',selectReviewsId);
    const changeCmt = await putReview(accessToken, rating, textValue, product.id, selectReviewsId[0].id);
    } catch(err){
        console.error(err);
    }
    getReview();
    // const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
    // await delay(800);
    setIsChange(false);
};

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
              <span>{[...Array(5)].map((star, index)=>{
                
                return(
                    <>   
                        <FaStar class="star"
                        size={20}
                            color={average >= index+1 ? "#ffc107":"e4e5e9"}
                        />
                    </>
                    
                )
            })}
            </span>{average == '0' &&<span> Chưa có đánh giá</span>}
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
        <div style={{marginTop: '10px'}} className='col-md-9 review-container'>
            <div>
              <h3>Đánh giá sản phẩm</h3>
              {average == '0' &&<span> Chưa có đánh giá</span>}
              <section>
                {reviewProduct && reviewProduct.length > 0 
                && reviewProduct.map((review, index)=>{
                  return(
                    <>
                    <div className='row review' key={index}>
                      <div>
                      <div className='writer'>{review.writer} - <span className='time'>{handleTime(review.updated_at)}</span></div>
                      {isChange !== index && [...Array(5)].map((star, index)=>{
                          return(
                              <>
                              <label>
                                  <input type="radio"
                                  style={{display:'none'}}
                                  name="rating"
                                  value={review.rating}
                                  />
                                  <FaStar class="star"
                                  size={30}
                                      color={review.rating >= index +1 ? "#ffc107":"e4e5e9"}
                                  />
                              </label>
                              </>
                              
                          )
                      })}
                      </div>
                      {isChange !== index && <div className='cmt'>{review.comment}</div>}
                      {isChange === index && review.writer === writer && <div className="rating-container">
                      {[...Array(5)].map((star, index)=>{
                          const currentRating = index + 1;
                          return(
                              <>
                              <label>
                                  <input type="radio"
                                  style={{display:'none'}}
                                  name="rating"
                                  value={currentRating}
                                  onClick={() => setRating(currentRating)}
                                  />
                                  <FaStar class="star"
                                  size={50}
                                      color={currentRating <= (hover || rating) ? "#ffc107":"e4e5e9"}
                                      onMouseEnter={() => setHover(currentRating)}
                                      onMouseLeave={() => setHover(null)}
                                  />
                              </label>
                              </>
                              
                          )
                      })}
                      <div>
                          <textarea className='text-area'
                          value={textValue}
                          onChange={handleChange}
                          placeholder="Nhập văn bản ở đây..."
                          rows={4} // Số hàng trong textarea
                          cols={50} // Số cột trong textarea
                          />
                          <div className="text-container">
                              <button className='text-suggest' onClick={() => setTextValue('Chất lượng sản phẩm tuyệt vời...')}>Chất lượng sản phẩm tuyệt vời</button>
                              <button className='text-suggest' onClick={() => setTextValue('Đóng gói sản phẩm rất đẹp...')}>Đóng gói sản phẩm rất đẹp</button>
                          </div>
                      </div>
                      <div className='evaluate-container'>
                        <button className='evaluate' onClick={handleRating}>Đánh giá</button>
                        <button className='cancel' onClick={handleCancelChangeCmt}>Hủy</button>
                      </div>
                  </div>}
                      {review.writer === writer && isChange !== index && <i onClick={() => handleChangeCmt(index)} className="pen text-end fa-solid fa-pen"></i>}
                    </div>
                      <hr/>
                    </>
                  )
                })}
              </section>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
