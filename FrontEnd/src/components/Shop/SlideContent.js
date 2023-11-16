import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAccessToken } from '../../store/slice/userSlice';
import { handleAddToCart } from '../../utils/addToCartUtils';
import alt from '../../assets/image/draw2.webp';
import { useEffect, useState } from 'react';
import NothingShowMore from './NoProduct';

const SlideContent = ({ selectedCategory, filterSelect, filter }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const accessToken = useSelector(selectAccessToken);
  const [loadingMap, setLoadingMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const [visibleProducts, setVisibleProducts] = useState(8); // Số lượng sản phẩm hiển thị ban đầu


  useEffect(() => {
    setLoading(true);
    let updatedProducts = selectedCategory
  ? selectedCategory === 'Others'
    ? products
    : products.filter((product) => product.category === selectedCategory) // Lọc theo selectedCategory
  : products;

    // Apply additional filtering based on filter and filterValue
    let productsCopy = JSON.parse(JSON.stringify(updatedProducts));
    if (filterSelect &&  filterSelect === "PriceHighToLow") {
      updatedProducts = productsCopy.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if ( filterSelect && filterSelect === "PriceLowToHigh") {
      updatedProducts = productsCopy.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else {
    }

    if (filter) {
      updatedProducts = updatedProducts.filter((product) => {
        let isMatch = true;

        for (const filterKey in filter) {
          const filterValue = filter[filterKey];

          if (filterValue && product[filterKey] !== filterValue) {
            isMatch = false;
            break;
          }
        }

        return isMatch;
      });
    }

    setFilteredProducts(updatedProducts); // Cập nhật trạng thái
    setLoading(false);
  }, [selectedCategory, filterSelect, filter, products]);

  if(loading === true){
    return (<i className="fa-solid fa-spinner fa-spin loading"></i>);
  }
  // Thực hiện khi chọn một sản phẩm
  const selectProductHandler = (item) => {
    navigate(`/shop/${item.name}`);
  }

  const handleAddToCartInComponent = async (item) => {
    setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [item.id]: true }));
    await handleAddToCart(isLoggedIn, accessToken, item, dispatch, navigate);
    setLoadingMap((prevLoadingMap) => ({ ...prevLoadingMap, [item.id]: false }));
  };

  
  const productsToShow = filteredProducts.slice(0, visibleProducts);

  const loadMoreHandler = () => {
    // Mỗi lần nhấn nút "Xem thêm", tăng số lượng sản phẩm hiển thị lên 6
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6);
  };

  return (
    <>
      <>
        <div className='sliderContent'>
          <div className='card-container'>
            <div className='Card'>
              {productsToShow && productsToShow.length > 0 &&
                productsToShow.map((item, index) => {
                  return (
                    <div key={item.id} className='product-item'>
                      <div className='product-container'>
                        <div className='img-container card-img-top text-center'>
                          <img className='card-Img' onClick={() => selectProductHandler(item)} variant="top" src={item.image[0]?.image || alt} alt={item.name} />
                        </div>
                        <div className='card-Body'>
                          <div className='card-Title' onClick={() => selectProductHandler(item)}>{item.name}</div>
                          <div className='card-Text card-text'>
                            Brand: <span className='brand-text'>{item.brand ? item.brand : 'NaN'}</span>
                          </div>
                          <div className='card-Text card-text'>
                            Price: <span className='price-text'>{parseInt(item.price).toLocaleString('en-US').replace(/,/g, '.')}₫</span> 
                          </div>
                          <div className='card-Button'>
                            {/* <button variant="primary" className='mifbtn' onClick={() => selectProductHandler(item)}>More Info</button> */}
                            <button variant="primary" className='atcbtn' onClick={() => handleAddToCartInComponent(item)}>
                              {loadingMap[item.id] ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Add To Cart'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
              {filteredProducts && filteredProducts.length > visibleProducts && (
          <button className='btn btn-primary btn-lg more-product' onClick={loadMoreHandler}>Xem thêm</button>
        )}
          {filteredProducts && filteredProducts.length === 0 && 
          <NothingShowMore/>}
        </div>
      </>
    </>
  );
}

export default SlideContent;
