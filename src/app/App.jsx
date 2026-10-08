import { ThemeProvider } from "next-themes";
import { Router } from "./routes.jsx";

export default function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Router />
    </ThemeProvider>
  );
}
