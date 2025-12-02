import { useEffect, useState } from "react";
const KEY = "theme";

export default function useDarkMode() {
    const[theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem(KEY) || "light";
        } catch {
            return "light";
        }
    })

    
    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") root.setAttribute("data-theme", "dark");
        else root.removeAttribute("data-theme");

        try { localStorage.setItem(KEY, theme); } catch (e) {}
    }, [theme]);

   
    const toggle = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));
    return [theme, toggle];
}