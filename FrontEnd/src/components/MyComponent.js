import React, { useEffect, useState } from 'react';
import axios from '../services/Customize-axios'; // Import Axios from the axios library

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = () => {
      const url = "/api/products/";
      axios.get(url) // Use Axios to send a GET request
        .then(response => {
          setData(response.data); // Set the data with the response
          setLoading(false); // Set loading to false
        })
        .catch(error => {
          console.error(error);
          setLoading(false); // Set loading to false in case of an error
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
