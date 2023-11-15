import React from 'react';
import { useLocation, useParams } from 'react-router-dom';


const CheckEmail = () => {
  const location = useLocation();
  const {email} = useParams();

  return (
    <div className='check-email'>
      <p>{email ? `Password reset e-mail has been sent: ${email}` : 'Invalid email address.'}</p>
    </div>
  );
};

export default CheckEmail;