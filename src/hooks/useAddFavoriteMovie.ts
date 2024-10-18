import axios from "axios";
import { useState } from "react";

export function useAddFavoriteMovie(URLAPI: string, movieId: number) {
  const [loading, setLoading] = useState<boolean>(false);

  const addFavoriteMovie = async () => {
    const requestBody = {
      media_type: "movie",
      media_id: movieId,
      favorite: true,
    };
    try {
      setLoading(true);
      await axios.post(`${URLAPI}`, requestBody, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN_AUTH}`,
        },
      });

      setLoading(false);
    } catch (error) {
      console.log("Error fetch Data" + error);
    }
  };

  return { loading, addFavoriteMovie };
}
