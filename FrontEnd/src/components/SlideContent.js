import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAccessToken } from '../store/reducers/userSlice';
import { handleAddToCart } from '../utils/addToCartUtils';
import alt from '../draw2.webp';
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

  useEffect(() => {
    setLoading(true);
    let updatedProducts = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
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

  return (
    <>
      <>
        <div className='sliderContent'>
          <div className='card-container'>
            <div className='Card'>
              {filteredProducts && filteredProducts.length > 0 &&
                filteredProducts.map((item, index) => {
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
                            Price: <span className='price-text'>{parseInt(item.price).toString()}</span> ₫
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
          {filteredProducts && filteredProducts.length === 0 && 
          <NothingShowMore/>}
        </div>
      </>
    </>
  );
}

export default SlideContent;
