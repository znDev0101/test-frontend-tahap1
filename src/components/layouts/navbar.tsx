import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className='w-full flex justify-between items-center fixed top-0 bg-[#032541] py-4 px-5 lg:px-16  '>
      <nav>
        <Link to={"/"} className='text-white font-bold text-2xl'>
          TMDB
        </Link>
      </nav>
      <nav>
        <ul className='flex text-white font-semibold gap-x-8'>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
