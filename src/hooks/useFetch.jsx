import { useEffect, useState } from "react";
import axios from "axios";

/*
  Custom hook for API fetching with:
  - loading, error, data states
  - automatic header injection (API key)
  - graceful error messages
*/

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelToken;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        cancelToken = axios.CancelToken.source();

        const headers = {
            "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
          };


        const res = await axios.get(url, { headers, cancelToken: cancelToken.token });
        // make sure response is an array
        if (Array.isArray(res.data)) setData(res.data);
        else throw new Error("Unexpected response format");
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("API Error:", err.message);
        if (err.response) {
          if (err.response.status === 429)
            setError("Too many requests — please wait a minute and try again.");
          else if (err.response.status === 401)
            setError("Invalid API key. Check your .env settings.");
          else
            setError(`Server error (${err.response.status}). Try again later.`);
        } else if (err.request)
          setError("Network error — please check your connection.");
          else if (err.message.includes("Network Error")) {
          setError("Network issue or CORS restriction. Please wait and retry.");
        }
          else
          setError("Something went wrong while loading data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => cancelToken && cancelToken.cancel();
  }, [url]);

  return { data, loading, error };
}
