import { useState} from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/UserService';
import { toast } from 'react-toastify';




const FindAccount = () => {

    let navigate = useNavigate();    
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearchUser = async () =>{
        setLoading(true);
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
        {
            try{
                await resetPassword(email);
                navigate(`/login/identify/${email}`);
            } catch(err){
                toast.error('Email chưa được đăng ký!');
            }
        } else{
            toast.warning('Vui lòng nhập đúng email!');
        }
        setLoading(false);
    }

    const handleCancel = () =>{
        navigate('/login');
    }


    return (
        <>
            <section className="vh-100 login-container">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>

                        <div className="divider d-flex align-items-center my-4 title">
                            <p className="text-center fw-bold mx-3 mb-0">Find Your Account</p>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label text" for="form3Example3">Please enter your email address to search for your account</label>
                            <input  type="email" id="form3Example3" className="form-control form-control-lg"
                            placeholder="Enter a valid email address" value={email} onChange={(event)=>setEmail(event.target.value)}/>
                        </div>

                        <div className="d-flex justify-content-between text-lg-start mt-4 pt-2">
                            <button 
                            onClick={handleCancel}
                            type='button'
                            className="active btn btn-primary btn-lg login-btn"
                            >Cancel</button>
                            <button 
                            onClick={handleSearchUser}
                            type="button" 
                            className="active btn btn-primary btn-lg login-btn" 
                            >{loading ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Search'}</button>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default FindAccount;