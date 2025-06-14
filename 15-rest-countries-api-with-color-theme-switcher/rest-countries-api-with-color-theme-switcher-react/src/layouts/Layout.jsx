import MenuBar from "../components/MenuBar.jsx";
import {useEffect, useState} from "react";

function Layout({main}) {
    const [theme, setTheme] = useState(getInitialTheme())
    useEffect(() => localStorage.setItem("theme", theme), [theme]);

    const switchTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
    }

    return (
        <>
            <header data-theme={theme}>
                <MenuBar onSwitchTheme={switchTheme}/>
            </header>
            <main data-theme={theme}>
                {main}
            </main>
        </>
    )
}

function getInitialTheme() {
    return localStorage.getItem("theme")
        || (window.matchMedia("(prefers-color-scheme: dark)").matches && "dark")
        || "light";
}

export default Layout
