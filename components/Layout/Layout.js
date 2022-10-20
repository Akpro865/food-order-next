import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { useState, useEffect } from 'react'

function Layout({children}) {
	const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme")
    );
    setTheme(localStorage.getItem("theme"));
  }, []);

  const switchTheme = () => {
    if (theme === "light") {
      saveTheme("dark");
    } else {
      saveTheme("light");
    }
  };

  const saveTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };
  return (
   <>
   	<Navbar switchTheme={switchTheme}/>
   		{children}
   	<Footer />
   </>
  )
}

export default Layout
