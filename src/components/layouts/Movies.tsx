import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import CardMovies from "../ui/card";
import axios from "axios";

const Movies = () => {
  const [moviesPopularPage, setMoviesPopularPage] = useState<any[]>([]);
  const [visibleMovies, setVisibleMovies] = useState<number>(30);

  const moviesPlayNow = useFetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
  );

  const fetchMovies = async (): Promise<void> => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN_AUTH}`,
        },
      };
      const responses = await Promise.all([
        axios.get(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
          options
        ),
        axios.get(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2",
          options
        ),
        axios.get(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=3",
          options
        ),
        axios.get(
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=4",
          options
        ),
      ]);

      // Concatenate all results from multiple pages
      const allMovies = responses.flatMap((response) => response.data.results);
      setMoviesPopularPage(allMovies); // Store all 60 movies
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // UseEffect to fetch movies once when the component mounts
  useEffect(() => {
    fetchMovies();
    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, []);

  // Load more movies (6 at a time)
  const loadMore = (): void => {
    setVisibleMovies((prevCount) => prevCount + 6);
  };

  return (
    <div className='max-w-[78rem] mx-5 lg:mx-auto mt-20'>
      <div className='w-full'>
        <h1 className='font-bold text-2xl'>Now Playing Movies</h1>
        <div className='flex flex-wrap gap-5 mt-8'>
          {moviesPlayNow.results.slice(0, 6).map((data: any, i: number) => {
            return <CardMovies key={i} data={data} />;
          })}
        </div>
      </div>
      <div className='w-full'>
        <h1 className='font-bold text-2xl mt-10'>Popular Movies</h1>
        <div className='flex flex-wrap gap-5 mt-8'>
          {moviesPopularPage
            .slice(0, visibleMovies)
            .map((data: any, i: number) => {
              return <CardMovies key={i} data={data} />;
            })}
        </div>
        {visibleMovies < moviesPopularPage.length && (
          <button
            onClick={loadMore}
            className='flex justify-center w-full my-10 py-2 rounded-md bg-[#032541] text-white font-bold'
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Movies;
