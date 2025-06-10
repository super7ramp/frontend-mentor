import style from './App.module.scss'
import Menu from "./components/Menu.jsx";
import SearchBar from "./components/SearchBar.jsx";

function App() {
    return (
        <>
            <Menu/>
            <header className={style.header}>
                <SearchBar/>
            </header>
            <main>

            </main>
        </>
    )
}

export default App
