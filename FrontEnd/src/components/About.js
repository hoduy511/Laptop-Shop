import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Abouts = () => {
    const [content, setContent] = useState([]);
    const apiUrl = `https://app.swaggerhub.com/apis/HODUY244/laptop-shop_api/v1#/api/api_user_read`;

    useEffect(() => {
        const getContent = async () => {
          try {
            const response = await axios.get(apiUrl);
            console.log('check response from about>>>', response);
            setContent(response.data);
          } catch (error) {
            console.error('Lỗi khi tải danh mục:', error);
          }
        };
        getContent();
      }, []);

  return(
    <>
        <div>
          Hello
        </div>
    </>
  ) 
};

export default Abouts;
