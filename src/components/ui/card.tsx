import { useContext, useState } from "react";
import { TypeMovies } from "../../types/typeMovies";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAddFavoriteMovie } from "../../hooks/useAddFavoriteMovie";
import { MyContext } from "../../context/AddFavoriteContext";
import toast, { Toaster } from "react-hot-toast";

const CardMovies = ({ data }: { data: TypeMovies }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const path_img: string = "https://image.tmdb.org/t/p/w500/";
  const context = useContext(MyContext);

  const { loading, addFavoriteMovie } = useAddFavoriteMovie(
    "https://api.themoviedb.org/3/account/12924709/favorite",
    data.id
  );
  const handleAddFavoriteMovie = () => {
    if (context?.isLogin) {
      addFavoriteMovie();
      setIsFavorite(!isFavorite);
      toast.success("success add to favorite movies");
    } else {
      toast.error("Before your add favorite movies, you must login");
    }
  };

  return (
    <div className='w-44 lg:w-52 border border-gray-600 rounded-md overflow-hidden'>
      <Toaster position='bottom-center' reverseOrder={false} />
      <div className='flex flex-col'>
        <img src={path_img + data.poster_path} alt='poster' />
        <div className='flex justify-between items-center px-3 mt-4'>
          <div>
            <h5 className='font-bold'>{data.title}</h5>
            <span>{data.release_date}</span>
          </div>
          {isFavorite ? (
            <FaHeart
              className='text-pink-500 text-lg hover:cursor-pointer'
              onClick={handleAddFavoriteMovie}
            />
          ) : (
            <FaRegHeart
              className='text-lg hover:cursor-pointer'
              onClick={handleAddFavoriteMovie}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CardMovies;
