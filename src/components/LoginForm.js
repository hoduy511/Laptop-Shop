import image from '../draw2.webp';

const Login = () => {
    return (
        <>
            <section class="vh-100 login-container">
                <div class="container-fluid h-custom">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-md-9 col-lg-6 col-xl-5">
                        <img src={image} class="img-fluid" alt="Sample image"/>
                    </div>
                    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form>

                        <div class="divider d-flex align-items-center my-4 title">
                            <p class="text-center fw-bold mx-3 mb-0">Log in</p>
                        </div>

                        <div class="form-outline mb-4">
                            <label class="form-label text" for="form3Example3">Email address</label>
                            <input type="email" id="form3Example3" class="form-control form-control-lg"
                            placeholder="Enter a valid email address" />
                        </div>

                        <div class="form-outline mb-3">
                            <label class="form-label text" for="form3Example4">Password</label>
                            <input type="password" id="form3Example4" class="form-control form-control-lg"
                            placeholder="Enter password" />
                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                            <div class="form-check mb-0">
                            <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                            <label class="form-check-label" for="form2Example3">
                                Remember me
                            </label>
                            </div>
                            <a href="#!" class="text-body">Forgot password?</a>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button type="button" class="btn btn-primary btn-lg login-btn">Login</button>
                            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                                class="link-danger">Register</a></p>
                        </div>

                        </form>
                    </div>
                    </div>
                </div>
            </section>
            {/* <div className="login-container col-4 m-auto">
                <div className="title">Log in</div>
                <div className="text">Email or Username</div>
                <input/>
                <input/>
                <button>Login</button>
                <div>Go back</div>
            </div> */}
        </>
    )
}

export default Login;