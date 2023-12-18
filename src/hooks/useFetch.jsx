// useFetch.js
import { useCallback, useState } from "react";

export const useFetch = async () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  const fetchData = async ({ path, method, data }) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/${path}`, {
        method,
        headers: {
          'Authorization': `token ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      const resdata = await res.json();
      setIsLoading(false);
      setApiData(resdata);

    } catch (error) {
      setIsLoading(false);
      setServerError(error);
      console.log(error)
    }
  }

  return { isLoading, apiData, serverError, fetchData };
};
