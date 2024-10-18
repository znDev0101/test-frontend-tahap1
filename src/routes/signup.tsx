import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

interface FormElements extends HTMLFormControlsCollection {
  usernameInput: HTMLInputElement;
}
interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleSubmit = async (
    event: React.FormEvent<UsernameFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    toast("Loading...");
    const response = await axios.post(
      "https://backend-api-pied-three.vercel.app/api/signup",
      { email, password },
      {
        withCredentials: true,
        headers: {
          accept: "application/json",
        },
      }
    );
    toast.success("User Created");
    setMessage(response.data.message);
    setIsLoading(false);
    if (
      response.data.message !== "User not found" ||
      response.data.message !== "Invalid password"
    ) {
      setIsLogin(!isLogin);
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
          <button
            type='submit'
            className={`w-full flex ${
              isLoading ? "bg-[#124a78]" : "bg-[#032541]"
            }  text-white justify-center mt-8 border border-gray-600 py-2  font-bold text-xl rounded-md`}
            disabled={isLoading}
          >
            {isLoading ? "Sign Up..." : "Sign Up"}
          </button>
        </form>
        <div className=''>
          <p>{message}</p>
        </div>
        <div className='text-center mt-7'>
          <p>
            already account ?{" "}
            <Link to={"/login"} className='font-bold'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
