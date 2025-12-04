import { SkeletonTheme } from "react-loading-skeleton";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import useDarkMode from "./Hooks/UseDarkMode";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./components/Auth";

// Create a layout component for the authenticated view
const Dashboard = () => {
  return (
    <>
      <Main />
      <Sidebar />
    </>
  );
};

const App = () => {
  const [theme] = useDarkMode();
  const isDark = theme === "dark";

  const darkBaseColor = "#313131";
  const darkHighlightColor = "#525252";
  const lightBaseColor = "#f0f0f0";
  const lightHighlightColor = "#e1e1e1";

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />
    },
    {
      path: '/login',
      element: <Auth />
    }
  ]);

  return (
    <SkeletonTheme 
      baseColor={isDark ? darkBaseColor : lightBaseColor}
      highlightColor={isDark ? darkHighlightColor : lightHighlightColor}
    >
      <RouterProvider router={router} />
    </SkeletonTheme>
  )
}

export default App