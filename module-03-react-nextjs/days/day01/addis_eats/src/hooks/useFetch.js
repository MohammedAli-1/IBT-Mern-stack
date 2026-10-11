import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Data couldn't load");
        }

        const result = await res.json();

        setData(result);
      } catch (error) {
        console.log("Data not loaded", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [url]);

  return {
    data,
    error,
    loading,
  };
}

export default useFetch;
