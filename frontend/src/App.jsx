import { SkeletonTheme } from "react-loading-skeleton"
import Cards from "./components/Cards"
import Main from "./components/Main"
import Sidebar from "./components/Sidebar"
import useDarkMode from "./Hooks/UseDarkMode"

const App = () => {
  const [theme] = useDarkMode();
  const isDark = theme === "dark";

  const darkBaseColor = "#313131"; 
  const darkHighlightColor = "#525252"; 
  const lightBaseColor = "#f0f0f0";
  const lightHighlightColor = "#e1e1e1";

  return (
    <>
      <SkeletonTheme 
      baseColor={isDark ? darkBaseColor : lightBaseColor}
       highlightColor={isDark ? darkHighlightColor : lightHighlightColor}>
          <Main/>
          <Cards/>
          <Sidebar/>
      </SkeletonTheme>
    </>
  )
}

export default App