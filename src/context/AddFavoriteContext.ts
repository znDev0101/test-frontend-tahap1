import { createContext, Dispatch, SetStateAction } from "react";

type MyContextType = {
  isLogin: boolean | null;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

export const MyContext = createContext<MyContextType | null>(null);
