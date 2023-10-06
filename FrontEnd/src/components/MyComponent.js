import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = () => {
      const url = "http://127.0.0.1:8000/api/products/";
      return fetch(url).then(
        resp => resp.json() // this returns a promise
      ).then(repos => {
        for (const repo of repos) {
          console.log(repo.name);
        }
      }).catch(ex => {
        console.error(ex);
      })
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