import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Login = () => {
  const [cookies, setCookies] = useCookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("http://127.0.0.1:8000/api/user/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      const { accessToken, refreshToken } = getAccessTokenAndRefreshTokenFromResponseCookies(response);
      
      // Lưu access token và refresh token vào cookie của React
      setCookies({
        "access": accessToken,
        "refresh": refreshToken,
      });

    console.log('response>>>',response)

  };

  const getAccessTokenAndRefreshTokenFromResponseCookies = (response) => {
    const accessTokenCookie = response.headers.get("Set-Cookie");
    const refreshTokenCookie = response.headers.get("Set-Cookie");
  
    const accessToken = accessTokenCookie;
    const refreshToken = refreshTokenCookie;
  
    return {
      accessToken,
      refreshToken,
    };
  };

  

  return (
    <div>
      <input
        type="text"
        placeholder="Tên đăng nhập"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
};

export default Login;