import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Abouts = () => {
    const [content, setContent] = useState([]);
    const apiUrl = `http://127.0.0.1:8000/api/products/`;

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

      const handleClick =(item) =>{
        console.log(item.name);
      }

  return(
    <>
        <div>
        {content && content.length >0 &&
        content.map((item, index)=>{
          return(
            <>
              <span onClick={()=> handleClick(item)} key={item.id}>{item.name}</span>
              <div>{item.category}</div>
              <div>{item.image}</div>
            </>
          )
        })}
        </div>
    </>
  ) 
};

export default Abouts;
