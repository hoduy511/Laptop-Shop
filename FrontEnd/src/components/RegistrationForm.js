import image from '../draw2.webp';
import React, {useEffect, useState} from 'react';
import PhoneInput from 'react-phone-input-2';
// import { registerAPi } from '../services/UserService';
import axios from 'axios';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [validPhoneNumber, setValidPhoneNumber] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [isShowPassword, setIsShowPassword] = useState("");
    const [isShowPassword2, setIsShowPassword2] = useState("");

    const handleRegister = () =>{
        console.log('check email:',email);
        console.log('check phone:',phoneNumber);
        console.log('check fn:',firstName);
        console.log('check ln:',lastName);
        console.log('check pass:',password);
        console.log('check pass2:',password2);
        registerUser();
        toast.success('Register success!')
    }

    const registerUser = async () =>{
        try{
            const res = await axios.post(`http://127.0.0.1:8000/api/user/register/`,{
                email: email,
                password1: password,
                password2: password2,
                first_name: firstName,
                last_name: lastName,
            });
            console.log('Kết quả từ server:', res)
        } catch (error){
            console.error('Lỗi gửi yêu cầu lên POST:',error);
        }
    }

    const handlePhoneNumber = (value)=>{
        setPhoneNumber(value);
        console.log('>>>check value:', value)
        // setValidPhoneNumber(validatePhoneNumber(value));
        console.log('check valid:',validPhoneNumber)
    }

    const validatePhoneNumber = (phoneNumber) =>{
        const phoneNumberPattern = /^\d{10}$/;
        return phoneNumberPattern.test(phoneNumber);
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
                                    <label className="form-label text" htmlFor="form3Example4">Email address</label>
                                    <input type="email" id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter a valid email address"  onChange={(event)=>setEmail(event.target.value)}/>
                                </div>


                                <div className="form-outline mb-4">
                                    <label className="form-label text" type='text' htmlFor="form3Example4">Phone Number</label>
                                    <PhoneInput country="vn" onlyCountries={['vn']} 
                                    inputProps={{
                                        required: true,
                                    }}
                                    value={phoneNumber} id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter your phone number"  onChange={handlePhoneNumber}/>
                                </div>
                                {!validPhoneNumber && <p>Please enter a valid phone number!</p>}

                                <div className="form-outline mb-4">
                                    <label className="form-label text" htmlFor="form3Example3">First Name</label>
                                    <input type="text" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Enter your first name" onChange={(event)=>setFirstName(event.target.value)}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label text" htmlFor="form3Example3">Last Name</label>
                                    <input type="text" id="form3Example3" className="form-control form-control-lg"
                                        placeholder="Enter your last name" onChange={(event)=>setLastName(event.target.value)}/>
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

                                <div className="form-outline mb-3">
                                    <label className="form-label text" for="form3Example4">Re-Enter the Password</label>
                                    <div className='input-wrapper'>
                                        <input type={isShowPassword2 ? "text" : "password"} id="form3Example4" className="form-control form-control-lg"
                                        placeholder="Enter password" value={password2} onChange={(event)=>setPassword2(event.target.value)}/>
                                        <span><i className={isShowPassword2 === false ? "fa-solid fa-eye-slash": "fa-solid fa-eye"}
                                        onClick={()=>setIsShowPassword2(!isShowPassword2)}></i></span>
                                    </div>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" disabled={(email || phoneNumber) && password && password2 && firstName && lastName ? false:true}
                                    className={email && phoneNumber && password && password2 && firstName && lastName ? "active btn btn-primary btn-lg login-btn":"btn btn-primary btn-lg login-btn"}
                                    onClick={() => handleRegister()}>Register</button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a to="/Laptop-Shop/login"
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
