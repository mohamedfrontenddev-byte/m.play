import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        // Handle dummyjson API response structure (products array)
        const productsData = response.data.products || response.data;
        setData(productsData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    if (url) fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;