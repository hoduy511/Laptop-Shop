import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../../store/slice/userSlice";
import { FaStar } from 'react-icons/fa';
import { createReview, getReviewList, putReview } from "../../services/CommentService";
import { toast } from "react-toastify";
import '../../assets/styles/Rating.scss'

const Rating = ({product,handleClose}) => {
    const accessToken = useSelector(selectAccessToken);
    const [rating,setRating] = useState(5);
    const [hover, setHover] = useState(null);
    const [textValue, setTextValue] = useState();
    const user = useSelector((state)=>state.user.user.user);

    const handleChange = (event) => {
        setTextValue(event.target.value);
    };

    const handleRating = async () =>{
        try{
            const response = await createReview(accessToken, rating, textValue, product.id);
        } catch(err){
            if(err.response.status === 400){///Đã tồn tại đánh giá
                const writer = user.first_name + ' '+ user.last_name;
                try{
                const reviewList = await getReviewList();
                const selectReviewsId = reviewList.results.filter(p => p.writer === writer && p.product == product.id);
                console.log(selectReviewsId);
                const changeCmt = await putReview(accessToken, rating, textValue, product.id, selectReviewsId[0].id);
                toast.success('Thành công!');
                handleClose();
                } catch(err){
                    console.error(err);
                    toast.error('Có lỗi xảy ra!');
                }
            }
        }
    };
    
return (
    <>
    <div className="rating-container">
        <div>
            <h5>{product.name}</h5>
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
        </div>
        <div>
            <textarea
            value={textValue}
            onChange={handleChange}
            placeholder="Nhập văn bản ở đây..."
            className="text-area"
            rows={4} // Số hàng trong textarea
            cols={50} // Số cột trong textarea
            />
            <div className="text-container">
                <button className="text-suggest" onClick={() => setTextValue('Chất lượng sản phẩm tuyệt vời...')}>Chất lượng sản phẩm tuyệt vời</button>
                <button className="text-suggest" onClick={() => setTextValue('Đóng gói sản phẩm rất đẹp...')}>Đóng gói sản phẩm rất đẹp</button>
            </div>
        </div>
        <div className="evaluate-container">
            <button className="evaluate" onClick={handleRating}>Đánh giá</button>
        </div>
    </div>
    </>
);
};

export default Rating;