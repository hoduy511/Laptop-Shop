import { useState } from 'react';
import { loginApi } from '../services/UserService';

import sample from '../draw2.webp'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState("");

    const handleLogin = () =>{
       loginApi(email, password)
      .then(res => {
        console.log(res);
        if (res && res.token){
            localStorage.setItem('token',res.token)
        }
      })    
      .catch(error => {
        // Xử lý lỗi khi đăng nhập thất bại
        console.error('Đăng nhập thất bại:', error);
      });
    }

    return (
        <>
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
                            <label className="form-label text" for="form3Example3">Email address</label>
                            <input type="email" id="form3Example3" className="form-control form-control-lg"
                            placeholder="Enter a valid email address" value={email} onChange={(event)=>setEmail(event.target.value)}/>
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
                            <a href="#!" className="text-body">Forgot password?</a>
                        </div>

                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button type="button" disabled={email && password ? false:true}
                            className={email && password ? "active btn btn-primary btn-lg login-btn":"btn btn-primary btn-lg login-btn"}
                            onClick={(email, password) => handleLogin()}>Login</button>
                            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/Laptop-Shop/register"
                                className="link-danger">Register</a></p>
                        </div>

                        </form>
                    </div>
                    </div>
                </div>
            </section>
            {/* <div classNameName="login-container col-4 m-auto">
                <div classNameName="title">Log in</div>
                <div classNameName="text">Email or Username</div>
                <input/>
                <input/>
                <button>Login</button>
                <div>Go back</div>
            </div> */}
        </>
    )
}

export default Login;