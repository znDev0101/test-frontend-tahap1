import CardMovies from "../components/ui/card";
import { useFetch } from "../hooks/useFetch";

export default function Profile() {
  const { results } = useFetch(
    "https://api.themoviedb.org/3/account/21573750/favorite/movies?language=en-US&page=1&sort_by=created_at.asc"
  );

  return (
    <div className='w-full my-20'>
      <div className='max-w-7xl mx-auto px-5'>
        <h1 className='text-2xl font-bold'>List favorite Movies</h1>
        <div className='flex flex-wrap mt-10 gap-5'>
          {results.map((data: any, i: number) => {
            return <CardMovies data={data} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}
