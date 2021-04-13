import { useState, useEffect } from "react";

import { CONSTANTS } from "../constants";

export const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function loadData() {
      try {
        const res = await fetch(url);
        const resJson = await res.json();
        setData(resJson);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    const timer = setTimeout(() => loadData(), CONSTANTS.TIMEOUT / 2);

    return () => {
      clearTimeout(timer);
    };
  }, [url]);
  return { loading, data, error };
};
