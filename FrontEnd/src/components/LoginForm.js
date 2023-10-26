import { useEffect, useState, useRef } from 'react';
import { loginApi } from '../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../store/reducers/userSlice';

import sample from '../draw2.webp'
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Login = (props) => {

    let navigate = useNavigate();    
    const location = useLocation();
    const from = location.state?.from?.pathname || "/Laptop-Shop/";
    
    const userRef = useRef();
    const errRef = useRef();

    const dispatch = useDispatch();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');

    const handleLogin = async () =>{
        try {
            let response = await loginApi(user, password);
                const userInfo = response;
                console.log('check user info', userInfo);
                dispatch(loginSuccess(userInfo));
                setUser('');
                setPassword('');
                navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
                console.error(err);
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
    }}

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, password])

    return (
        <>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <section className="vh-100 login-container">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img src={sample} className="img-fluid" alt="Sample"/>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>

                        <div className="divider d-flex align-items-center my-4 title">
                            <p className="text-center fw-bold mx-3 mb-0">Log in</p>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label text" for="form3Example3">UserName</label>
                            <input ref={userRef} type="email" id="form3Example3" className="form-control form-control-lg"
                            placeholder="Enter a valid email address or phone number" value={user} onChange={(event)=>setUser(event.target.value)}/>
                        </div>

                        <div className="form-outline mb-3">
                            <label className="form-label text" for="form3Example4">Password</label>
                            <div className='input-wrapper'>
                                <input type={isShowPassword ? "text" : "password"} id="form3Example4" className="form-control form-control-lg"
                                placeholder="Enter password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
                                <span><i className={isShowPassword === false ? "fa-solid fa-eye-slash": "fa-solid fa-eye"}
                                onClick={()=>setIsShowPassword(!isShowPassword)}></i></span>
                            </div>
                        </div>
                    
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="form-check mb-0">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                            <label className="form-check-label" for="form2Example3">
                                Remember me
                            </label>
                            </div>
                            <a to="#!" className="text-body">Forgot password?</a>
                        </div>

                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button type="button" disabled={user && password ? false:true}
                            className={user && password ? "active btn btn-primary btn-lg login-btn":"btn btn-primary btn-lg login-btn"}
                            onClick={(user, password) => handleLogin()}>Login</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/Laptop-Shop/register/"
                                className="link-danger">Register</Link></p>
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