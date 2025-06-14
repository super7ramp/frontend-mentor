import MenuBar from "../components/MenuBar.jsx";
import {useEffect, useState} from "react";

function Layout({main}) {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
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

export default Layout
