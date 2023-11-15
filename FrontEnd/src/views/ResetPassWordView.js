import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../store/reducers/authSlice";
import { toast } from "react-toastify";

const ResetPasswordView = () => {
  let { uid, token } = useParams(); // get key (token) from URL
  const location = useLocation();
  const dispatch = useDispatch();
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [isShowPassword1, setIsShowPassword1] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);
  const resetPasswordStatus = useSelector((state) => state.auth.resetPasswordStatus)
  const [isPassword1Valid, setIsPassword1Valid] = useState(true);
  const [isPassword2Valid, setIsPassword2Valid] = useState(true);

  const handleResetPassword = () =>{
    setLoading(true);
    setIsPassword1Valid(validatePassword(password1));
    setIsPassword2Valid(password1 === password2);
    const isPasswordValid = validatePassword(password1) && password1 === password2;
    if (isPasswordValid){
        const key = {password1, password2, uid, token}
        // dispatch(resetPassword(key));
        // if(resetPasswordStatus === 'unknown' || resetPasswordStatus === 'error'){
        //     toast.error('Failed to reset password!');
        // } else if (resetPasswordStatus === 'ok'){
            toast.success('Thành công!');
        // }
    } else if(!isPassword1Valid){
        toast.warning('Enter a valid password!')
    } else if(!isPassword2Valid){
        toast.warning('Re-enter your new password!')
    }
    console.log('Vãi');
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
                        <p className="text-center fw-bold mx-3 mb-0">Reset Your Password</p>
                    </div>

                    <div className="form-outline mb-3">
                        <label className="form-label text" for="form3Example4">
                            <ul>
                                <li>Password's length should be in between 8 to 15 characters.</li>
                                <li>Password should have at least one numerical digit(0-9).</li>
                            </ul>
                        </label>
                    </div>

                    <div className="form-outline mb-3">
                        <label className="form-label text" for="form3Example4">New Password</label>
                        <div className='input-wrapper'>
                            <input type={isShowPassword1 ? "text" : "password"} id="form3Example4" className="form-control form-control-lg"
                            placeholder="Enter new password" value={password1} onChange={(event)=>setPassword1(event.target.value)}
                            style={{ border: !isPassword1Valid ? '1px inset #E34F4F' : '' }}/>
                            <span><i className={isShowPassword1 === false ? "fa-solid fa-eye-slash": "fa-solid fa-eye"}
                            onClick={()=>setIsShowPassword1(!isShowPassword1)}></i></span>
                        </div>
                    </div>
                    {!isPassword1Valid && <p>Please enter your new password!</p>}


                    <div className="form-outline mb-3">
                        <label className="form-label text" for="form3Example4">Confirm New Password</label>
                        <div className='input-wrapper'>
                            <input type={isShowPassword2 ? "text" : "password"} id="form3Example4" className="form-control form-control-lg"
                            placeholder="Re-enter password" value={password2} onChange={(event)=>handlePassword2(event.target.value)}
                            style={{ border: !isPassword2Valid ? '1px inset #E34F4F' : '' }}/>
                            <span><i className={isShowPassword2 === false ? "fa-solid fa-eye-slash": "fa-solid fa-eye"}
                            onClick={()=>setIsShowPassword2(!isShowPassword2)}></i></span>
                        </div>
                    </div>
                    {!isPassword2Valid && <p>Please re-enter your password correctly!</p>}

                    <div className="d-flex justify-content-center text-lg-start mt-4 pt-2">
                        <button 
                        onClick={handleResetPassword}
                        type="button" 
                        className="active btn btn-primary btn-lg login-btn" 
                        >{loading ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Reset PassWord'}</button>
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
