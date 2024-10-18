import axios from "axios";
import { useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { MyContext } from "../context/AddFavoriteContext";

interface FormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const context = useContext(MyContext);

  const handleSubmit = async (event: React.FormEvent<UsernameFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://backend-api-pied-three.vercel.app/api/login",
        { email, password },
        {
          withCredentials: true,
          headers: {
            accept: "application/json",
          },
        }
      );
      setIsLoading(false);
      if (
        response.data.message !== "User not found" ||
        response.data.message !== "Invalid password"
      ) {
        context?.setIsLogin(!context.isLogin);
      }
    } catch (error) {
      if (error == "AxiosError: Request failed with status code 404") {
        setMessage("Invalid Email or Password");
        context?.setIsLogin(false);
        setIsLoading(false);
      }
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await axios.post("https://backend-api-pied-three.vercel.app/api/logout", {
        withCredentials: true,
      });
      setIsLoading(false);
      context?.setIsLogin(false);
    } catch (error) {
      setMessage("Logout failed");
    }
  };

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Toaster position='bottom-center' reverseOrder={false} />
      <div className='w-96 lg:border lg:border-gray-500 rounded-md p-10'>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              className='p-2 border border-gray-500 rounded-md'
              placeholder='type your email...'
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>
          <div className='flex flex-col mt-8'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              className='p-2 border border-gray-500 rounded-md'
              placeholder='type your password...'
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>
          {!context?.isLogin ? (
            <button
              type='submit'
              disabled={isLoading}
              className={`w-full flex ${
                isLoading ? "bg-[#124a78]" : "bg-[#032541]"
              } text-white justify-center mt-8 border border-gray-600 py-2  font-bold text-xl rounded-md`}
            >
              {isLoading ? "Sign In..." : "Sign In"}
            </button>
          ) : (
            <button
              type='submit'
              className='w-full flex bg-[#032541] text-white justify-center mt-8 border border-gray-600 py-2  font-bold text-xl rounded-md'
              onClick={handleLogout}
            >
              {isLoading ? "Logout..." : "Logout"}
            </button>
          )}
        </form>
        <div className='mt-5'>
          <p
            className={
              context?.isLogin
                ? "text-black text-center"
                : "text-red-500 text-center"
            }
          >
            {message}
          </p>
        </div>
        <div className='flex gap-x-2 items-center text-center mt-7'>
          <p>
            dont a have account ?{" "}
            <Link to={"/signup"} className='font-bold'>
              Sign Up
            </Link>
          </p>
          <div className=''>|</div>
          <Link to={"/"}>Home</Link>
        </div>
      </div>
    </div>
  );
}
