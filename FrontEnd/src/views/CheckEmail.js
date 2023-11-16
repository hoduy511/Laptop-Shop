import React from 'react';
import { useLocation, useParams } from 'react-router-dom';


const CheckEmail = () => {
  const location = useLocation();
  const {email} = useParams();

  return (
    <div className='check-email'>
      <p>{email ? `Email tạo mới mật khẩu đã được gửi tới: ${email}` : 'Email không hợp lệ.'}</p>
    </div>
  );
};

export default CheckEmail;