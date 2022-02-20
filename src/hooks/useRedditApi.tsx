import { useEffect, useState } from "react";

function useRedditApi(apiFunction: () => Promise<any>) {
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [unsuccessfulAttempts, setunSuccessfulAttempts] = useState(0);

  useEffect(() => {
    const makeApiCall = async () => {
      try {
        setisLoading(true);
        const data = await apiFunction();
        setData(data);
        setisLoading(false);
        setError(null);
      } catch (error) {
        setisLoading(false);
        setData(false);
        setError(
          "Oops! Something went wrong. Trying to reconnect to reddit..."
        );
        setunSuccessfulAttempts((prevCount) => prevCount + 1);
      }
    };

    if (unsuccessfulAttempts < 3) {
      makeApiCall();
    } else {
      setError("Cannot connect to api :( Try reloading the page");
    }
  }, [apiFunction, unsuccessfulAttempts]);

  return {
    isLoading,
    error,
    data,
  };
}

export default useRedditApi;
