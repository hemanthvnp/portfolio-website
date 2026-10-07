import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout.jsx";
import { Home } from "./components/Home.jsx";
import { NotFound } from "./components/NotFound.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "*", Component: NotFound },
    ],
  },
]);
