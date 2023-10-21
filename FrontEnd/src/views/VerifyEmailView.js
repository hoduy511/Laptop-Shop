import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getVerifyEmailStatus, verifyEmail } from "../store/reducers/authSlice";

export default function VerifyEmailView() {
  let { key } = useParams(); // get key (token) from URL
  let navigate = useNavigate(); // create navigate variable
  const dispatch = useDispatch();
  const emailVerifyStatus = useSelector(getVerifyEmailStatus); // get emailVerifyStatus

  // after view load send POST request
  useEffect(() => {
    if (key) {
      dispatch(verifyEmail(key));
    }
  }, [dispatch, key]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <h1>Verify Email</h1>

            {(emailVerifyStatus === "unknown" ||
              emailVerifyStatus === "error") && (
              <p>
                We can't verify your email. Please try to register again or
                contact us by email contact@monitor-uptime.com
              </p>
            )}
            {emailVerifyStatus === "started" && (
              <p>Email verification started, please wait a while ...</p>
            )}
            {emailVerifyStatus === "ok" && (
              <p>
                Successful email verification 🎉 Please login to start
                monitoring!
                <br />
                <button
                  className="btn btn-lg btn-primary my-2"
                  onClick={() => navigate("/Laptop-Shop/login")}
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
