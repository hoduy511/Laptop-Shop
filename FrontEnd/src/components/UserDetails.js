// Trang UserDetails.js
import React from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

const UserDetails = () => {
  const user = useSelector((state) => state.user.user);
  console.log('check user>>>',user);

  return (
    <div>
      <h2>Thông tin người dùng</h2>
      <p>Email: {user.token}</p>
      {/* Hiển thị thông tin khác của người dùng */}
    </div>
  );
};

export default connect()(UserDetails);
