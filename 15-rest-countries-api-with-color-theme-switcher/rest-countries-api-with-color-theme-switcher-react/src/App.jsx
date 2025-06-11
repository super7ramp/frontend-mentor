import style from './App.module.scss'
import MenuBar from "./components/MenuBar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import DropDownOptions from "./components/DropDownOptions.jsx";
import {useState} from "react";
import Card from "./components/Card.jsx";
import Country from "./models/Country.js";

function App() {
    const [countries, setCountries] = useState([
        new Country("France", "Paris", "66666666", "https://flagcdn.com/fr.svg", "Europe"),
        new Country("Germany", "Berlin", "55555555", "https://flagcdn.com/de.svg", "Europe"),
    ])

    return (
        <>
            <MenuBar/>
            <header className={style.header}>
                <SearchBar/>
                <DropDownOptions/>
            </header>
            <main className={style.countries}>
                {countries.map(country => <Card key={country.name} country={country}/>)}
            </main>
        </>
    )
}

export default App
