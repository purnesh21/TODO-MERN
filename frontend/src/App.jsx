import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LoginPage, RegisterPage } from "./components/auth";
import { Profile, ToDos } from "./components/Home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/todos",
      element: <ToDos />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
