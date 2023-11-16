import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/UserService";

const ResetPasswordView = () => {
  let { uid, token } = useParams(); // get key (token) from URL
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
    if (isPasswordValid){
        const key = {password1, password2, uid, token}
        try{
            const response = await resetPassword(key);
            console.log(response);
            toast.success('Thành công!');
            navigate('/login/');
        } catch(err){
            console.error(err);
        }
    } else if(!isPassword1Valid){
        toast.warning('Nhập lại mật khẩu!')
    } else if(!isPassword2Valid){
        toast.warning('Nhập lại mật khẩu!')
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
    <div>
        <section className="vh-100 login-container">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form>

                    <div className="divider d-flex align-items-center my-4 title">
                        <p className="text-center fw-bold mx-3 mb-0">Thiết lập mật khẩu</p>
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
                    {!isPassword1Valid && <p>Vui lòng nhập mật khẩu mới của bạn!</p>}


                    <div className="form-outline mb-3">
                        <label className="form-label text" for="form3Example4">Nhập lại mật khẩu</label>
                        <div className='input-wrapper'>
                            <input type={isShowPassword2 ? "text" : "password"} id="form3Example4" className="form-control form-control-lg"
                            placeholder="Vui lòng nhập lại mật khẩu" value={password2} onChange={(event)=>handlePassword2(event.target.value)}
                            style={{ border: !isPassword2Valid ? '1px inset #E34F4F' : '' }}/>
                            <span><i className={isShowPassword2 === false ? "fa-solid fa-eye-slash": "fa-solid fa-eye"}
                            onClick={()=>setIsShowPassword2(!isShowPassword2)}></i></span>
                        </div>
                    </div>
                    {!isPassword2Valid && <p>Vui lòng nhập lại chính xác mật khẩu mới của bạn!</p>}

                    <div className="d-flex justify-content-center text-lg-start mt-4 pt-2">
                        <button 
                        onClick={handleResetPassword}
                        type="button" 
                        className="active btn btn-primary btn-lg login-btn" 
                        >{loading ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Xác nhận'}</button>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </section>
    </div>
  );
}


export default ResetPasswordView;
