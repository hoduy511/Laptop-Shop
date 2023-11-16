import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getVerifyEmailStatus, verifyEmail } from "../../store/slice/authSlice";

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
                Chúng tôi không thể xác nhận email của bạn, vui lòng thử đăng ký lại hoặc liên hệ email: @nguyenhoangloc2208@gmail.com
              </p>
            )}
            {emailVerifyStatus === "started" && (
              <p>Vui lòng đợi một chút</p>
            )}
            {emailVerifyStatus === "ok" && (
              <p>
                Hoàn tốt 🎉 Vui lòng tới trang đăng nhập để đăng nhập
                <br />
                <button
                  className="btn btn-lg btn-primary my-2"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
