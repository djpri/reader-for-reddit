import { useEffect, useState } from "react";

function useRedditApi(apiFunction: () => Promise<any>) {
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const makeApiCall = async () => {
      try {
        setisLoading(true);
        const data = await apiFunction();
        setData(data);
        setisLoading(false);
        setError(false);
      } catch (error) {
        setisLoading(false);
        setData(false);
        setError(true);
      }
    };

    makeApiCall();
  }, [apiFunction]);

  return {
    isLoading,
    error,
    data,
  };
}

export default useRedditApi;
