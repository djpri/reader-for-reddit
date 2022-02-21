import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";

function useRedditApi(apiFunction: () => Promise<any>) {
  const router: NextRouter = useRouter();
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [unsuccessfulAttempts, setunSuccessfulAttempts] = useState(0);

  useEffect(() => {
    setisLoading(true);
    setError(null);
    setData(null);

    const makeApiCall = async () => {
      try {
        const data = await apiFunction();
        console.log(data);
        setData(data);
        setisLoading(false);
      } catch (error) {
        console.log(error);
        setisLoading(false);
        setData(false);
        setError(
          "Oops! Something went wrong. Trying to reconnect to reddit..."
        );
        setTimeout(() => {
          setunSuccessfulAttempts((prevCount) => prevCount + 1);
        }, 500);
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
    unsuccessfulAttempts,
  };
}

export default useRedditApi;
