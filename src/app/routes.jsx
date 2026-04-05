import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout.jsx";
import { Home } from "./components/Home.jsx";
import { Projects } from "./components/Projects.jsx";
import { Resume } from "./components/Resume.jsx";
import { Contact } from "./components/Contact.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "projects", Component: Projects },
      { path: "resume", Component: Resume },
      { path: "contact", Component: Contact },
    ],
  },
]);
