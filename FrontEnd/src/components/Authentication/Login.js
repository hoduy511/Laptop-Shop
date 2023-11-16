import { useEffect, useState, useRef } from 'react';
import { loginApi } from '../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { authentication, loginSuccess } from '../../store/slice/userSlice';
import '../../assets/styles/Login.scss';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import {toast} from 'react-toastify';

const Login = (props) => {

    let navigate = useNavigate();    
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [loading, setLoading] = useState(false);
    
    const userRef = useRef();
    const errRef = useRef();

    const dispatch = useDispatch();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');

    const handleLogin = async () =>{
        setLoading(true);
        try {
            let response = await loginApi(user, password);
                const userInfo = response;
                dispatch(loginSuccess(userInfo));
                dispatch(authentication(userInfo));
                setUser('');
                setPassword('');
                navigate(from, { replace: true });
                toast.success('Đăng nhập thành công!');


        } catch (err) {
            if (!err?.response) {
                toast.error('No Server Response');
            } else if (err.response?.status === 400) {
                toast.warning('Missing Username or Password!');
            } else if (err.response?.status === 401) {
                toast.warning('Wrong Username or Password!');
            } else {
                toast.warning('Login Failed!');
            }
            errRef.current.focus();
        }
        setLoading(false);
    }

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, password])

    return (
        <>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <section className="login-container">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>

                        <div className="divider d-flex align-items-center my-4 title">
                            <p className="text-center fw-bold mx-3 mb-0">Đăng nhập</p>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label text" for="form3Example3">Tên đăng nhập</label>
                            <input ref={userRef} type="email" id="form3Example3" className="form-control form-control-lg"
                            placeholder="Nhập email/Số điện thoại/Tên đăng nhập" value={user} onChange={(event)=>setUser(event.target.value)}/>
                        </div>

                        <div className="form-outline mb-3">
                            <label className="form-label text" for="form3Example4">Mật khẩu</label>
                            <div className='input-wrapper'>
                                <input type={isShowPassword ? "text" : "password"} id="form3Example4" className="form-control form-control-lg"
                                placeholder="Nhập mật khẩu" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                                <span><i className={isShowPassword === false ? "fa-solid fa-eye-slash": "fa-solid fa-eye"}
                                onClick={()=>setIsShowPassword(!isShowPassword)}></i></span>
                            </div>
                        </div>
                    
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="form-check mb-0">
                            </div>
                            <Link as={Link} to="/login/identify" className="text-body link-danger fw-bold text-decoration-none">Quên mật khẩu?</Link>
                        </div>

                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button type="button" disabled={user && password ? false:true}
                            className={user && password ? "active btn btn-primary btn-lg login-btn":"btn btn-primary btn-lg login-btn"}
                            onClick={(user, password) => handleLogin()}>{loading ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Login'}</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Không có tài khoản? <Link to="/register/"
                                className="link-danger">Đăng ký</Link></p>
                        </div>

                        </form>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login;