import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "./components/Layout.jsx";
import { Home } from "./components/Home.jsx";
import { NotFound } from "./components/NotFound.jsx";

// Declarative routes: two pages need no loaders or actions, and this keeps the data router out of the bundle.
export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
