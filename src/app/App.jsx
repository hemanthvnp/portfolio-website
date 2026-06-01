import { ThemeProvider } from "next-themes";
import { RouterProvider } from "react-router";
import { router } from "./routes.jsx";

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
