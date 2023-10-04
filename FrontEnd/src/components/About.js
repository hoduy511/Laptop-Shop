import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Abouts = () => {
    const [content, setContent] = useState([]);
    const apiUrl = "https://d87f-116-108-2-213.ngrok-free.app/snippets/";

    useEffect(() => {
        const getContent = async () => {
          try {
            const res = await axios.get(apiUrl);
            console.log('check res from about>>>', res);
            setContent(res.data);
          } catch (error) {
            console.error('Lỗi khi tải danh mục:', error);
          }
        };
        getContent();
      }, []);

  return(
    <>
        <div>
        </div>
    </>
  ) 
};

export default Abouts;
