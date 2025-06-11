import style from './App.module.scss'
import MenuBar from "./components/MenuBar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import DropDownOptions from "./components/DropDownOptions.jsx";
import {useEffect, useState} from "react";
import Card from "./components/Card.jsx";
import CountriesApi from "./api/CountriesApi.js";

function App() {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        const countriesApi = new CountriesApi(import.meta.env.VITE_COUNTRIES_API)
        countriesApi
            .getByName("France")
            .then(country => {
                setCountries([country])
            })
    }, []);

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
