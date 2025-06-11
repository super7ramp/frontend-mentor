import style from './App.module.scss'
import MenuBar from "./components/MenuBar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import DropDownOptions from "./components/DropDownOptions.jsx";

function App() {
    return (
        <>
            <MenuBar/>
            <header className={style.header}>
                <SearchBar/>
                <DropDownOptions/>
            </header>
            <main>

            </main>
        </>
    )
}

export default App
