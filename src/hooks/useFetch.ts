import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch(URLAPI: string) {
  const [results, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URLAPI}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN_AUTH}`,
        },
      });
      setData(data.results);
      setLoading(false);
    } catch (error) {
      console.log("Error fetch Data" + error);
    }
  };

  useEffect(() => {
    getData();
    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, []);

  return { results, loading };
}
