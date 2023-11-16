import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectAccessToken } from "../../store/slice/userSlice";
import { ChangePassword } from "../../services/UserService";
const ChangingPassword = () => {
    const accessToken = useSelector(selectAccessToken);
    const navigate = useNavigate();
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [isShowPassword1, setIsShowPassword1] = useState(false);
    const [isShowPassword2, setIsShowPassword2] = useState(false);
    const [isPassword1Valid, setIsPassword1Valid] = useState(true);
    const [isPassword2Valid, setIsPassword2Valid] = useState(true);

    const handleResetPassword = async () =>{
        setLoading(true);
        setIsPassword1Valid(validatePassword(password1));
        setIsPassword2Valid(password1 === password2);
        const isPasswordValid = validatePassword(password1) && password1 === password2;
        if  (isPasswordValid){
            try{
                const response = ChangePassword(accessToken, password1, password2);
                toast.success('Thành công!');
                navigate('/login/');
            } catch(err){
                console.error(err);
                toast.warning('Thay đổi mật khẩu thất bại!');
            }
        } else if(!isPassword1Valid){
            toast.warning('Hãy nhập chính xác mật khẩu!')
        } else if(!isPassword2Valid){
            toast.warning('Nhập lại mật khẩu mới của bạn!')
        }
        setLoading(false);
      }
    
      const validatePassword = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,15}$/;
        return passwordRegex.test(password);
      };
    
      const handlePassword2 = (event) =>{
        setPassword2(event);
        setIsPassword1Valid(true);
        setIsPassword2Valid(true);
      }
  return (
    <>
      <div className="change-password-container">
        <section className="login-container">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4">
                        <form>

                        <div className="divider d-flex align-items-center my-4 title">
                            <p className="text-center fw-bold mx-3 mb-0">Đổi mật khẩu</p>
                        </div>

                        <div className="form-outline mb-3">
                            <label className="form-label text" for="form3Example4">
                                <ul>
                                    <li>Ít nhất một kí tự viết thường.</li>
                                    <li>Ít nhất một kí tự viết hoa.</li>
                                    <li>8-16 kí tự</li>
                                    <li>Chỉ các chữ cái, số và ký tự phổ biến mới có thể được sử dụng.</li>
                                </ul>
                            </label>
                        </div>

                        <div className="form-outline mb-3">
                            <label className="form-label text" for="form3Example4">Mật khẩu mới</label>
                            <div className='input-wrapper'>
                                <input type={isShowPassword1 ? "text" : "password"} id="form3Example4" className="form-control form-control-lg"
                                placeholder="Nhập mật khẩu mới" value={password1} onChange={(event)=>setPassword1(event.target.value)}
                                style={{ border: !isPassword1Valid ? '1px inset #E34F4F' : '' }}/>
                                <span><i className={isShowPassword1 === false ? "fa-solid fa-eye-slash": "fa-solid fa-eye"}
                                onClick={()=>setIsShowPassword1(!isShowPassword1)}></i></span>
                            </div>
                        </div>
                        {!isPassword1Valid && <p>Please enter your new password!</p>}


                        <div className="form-outline mb-3">
                            <label className="form-label text" for="form3Example4">Nhập lại mật khẩu mới</label>
                            <div className='input-wrapper'>
                                <input type={isShowPassword2 ? "text" : "password"} id="form3Example4" className="form-control form-control-lg"
                                placeholder="Nhập lại mật khẩu mới" value={password2} onChange={(event)=>handlePassword2(event.target.value)}
                                style={{ border: !isPassword2Valid ? '1px inset #E34F4F' : '' }}/>
                                <span><i className={isShowPassword2 === false ? "fa-solid fa-eye-slash": "fa-solid fa-eye"}
                                onClick={()=>setIsShowPassword2(!isShowPassword2)}></i></span>
                            </div>
                        </div>
                        {!isPassword2Valid && <p>Vui lòng nhập lại chính xác mật khẩu!</p>}

                        <div className="d-flex justify-content-center text-lg-start mt-4 pt-2">
                            <button 
                            onClick={handleResetPassword}
                            type="button" 
                            style={{marginBottom: '10px'}}
                            className="active btn btn-primary btn-lg login-btn" 
                            >{loading ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Xác nhận'}</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </section>
      </div>
    </>
  );
};

export default ChangingPassword;