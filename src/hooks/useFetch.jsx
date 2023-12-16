// useFetch.js
import { useState } from "react";

export const useFetch = async () => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  const fetchData = async ({ method, path, body }) => {
    setIsLoading(true);
    try {
      const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/${path}`, {
        method: method,
        headers: {
          'Authorization': `token ${localStorage.token}`,
          'Content-type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await resp.json();

      setApiData(data);
      setIsLoading(false);
    } catch (error) {
      setServerError(error);
      setIsLoading(false);
    }
  };

  return { isLoading, apiData, serverError, fetchData };
};
