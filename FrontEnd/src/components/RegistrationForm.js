import image from '../draw2.webp';
import React, {useState} from 'react';

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState("");

    const handleRegister = () =>{
        alert('hello'); 
    }
    return (
        <>
            <section className="vh-100 login-container">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src={image} class="img-fluid" alt="Sample image"/>
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form>
                                <div className="divider d-flex align-items-center my-4 title">
                                    <p className="text-center fw-bold mx-3 mb-0">Register</p>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label text" htmlFor="form3Example3">UserName</label>
                                    <input type="text" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Enter your username" onChange={(event)=>setUsername(event.target.value)}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label text" htmlFor="form3Example4">Email address</label>
                                    <input type="email" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"  onChange={(event)=>setEmail(event.target.value)}/>
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

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" disabled={email && password && username ? false:true}
                                    className={email && password && username ? "active btn btn-primary btn-lg login-btn":"btn btn-primary btn-lg login-btn"}
                                    onClick={() => handleRegister()}>Register</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="/Laptop-Shop/login"
                                        className="link-danger">Login</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register;
