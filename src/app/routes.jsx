import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout.jsx";
import { Home } from "./components/Home.jsx";
import { About } from "./components/About.jsx";
import { Projects } from "./components/Projects.jsx";
import { Resume } from "./components/Resume.jsx";
import { Contact } from "./components/Contact.jsx";
import { NotFound } from "./components/NotFound.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "projects", Component: Projects },
      { path: "resume", Component: Resume },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
