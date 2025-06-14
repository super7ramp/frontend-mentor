import MenuBar from "../components/MenuBar.jsx";
import style from "./Layout.module.scss";
import {useEffect, useState} from "react";

/**
 * Layout component that wraps the main content of the application.
 *
 * @param main {JSX.Element} - The main content to be displayed within the layout.
 * @returns {JSX.Element}
 * @constructor
 */
function Layout({main}) {
    const [theme, setTheme] = useState(getInitialTheme())
    useEffect(() => localStorage.setItem("theme", theme), [theme]);

    const switchTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
    }

    return (
        <>
            <header className={style.header} data-theme={theme}>
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
