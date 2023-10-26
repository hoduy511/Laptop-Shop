import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  // Sử dụng useSelector để lấy thông tin người dùng từ userSlice
  const user = useSelector((state) => state.user.user.user);

  return (
    <div>
      <h2>User Profile</h2>
      {user ? (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {/* Hiển thị các thông tin tài khoản khác (nếu có) */}
          {console.log(user)}
        </div>
      ) : (
        <p>User is not logged in.</p>
      )}
    </div>
  );
}

export default UserProfile;
