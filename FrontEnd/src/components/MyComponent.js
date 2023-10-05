import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = () => {
      const url = "";
    
      return fetch(url, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Do something with the data
          console.log('check data:',data);
        });
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h1>API Response:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default MyComponent;