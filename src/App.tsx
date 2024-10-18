import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Movies from "./components/layouts/Movies";
import SignUp from "./routes/signup";
import { MyContext } from "./context/AddFavoriteContext";
import { useState } from "react";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Movies />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <MyContext.Provider value={{ isLogin, setIsLogin }}>
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}

export default App;
