import { createBrowserRouter } from "react-router";
import Layout from "../layout/Layout";
import Home from "../feature/home/Home";
import Login from "../feature/login/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Login />,
  },
]);

export default routes;
