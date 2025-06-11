import style from './App.module.scss'
import MenuBar from "./components/MenuBar.jsx";
import SearchBar from "./components/SearchBar.jsx";
import DropDownOptions from "./components/DropDownOptions.jsx";
import {useEffect, useState} from "react";
import Card from "./components/Card.jsx";
import CountriesApi from "./api/CountriesApi.js";

function App() {
    const [countries, setCountries] = useState([])
    const [region, setRegion] = useState("")
    const [search, setSearch] = useState("")
    const lowerCaseSearch = search.toLowerCase()

    useEffect(() => {
        const countriesApi = new CountriesApi(import.meta.env.VITE_COUNTRIES_API)
        countriesApi
            .getAll()
            .then(setCountries)
    }, []);

    return (
        <>
            <MenuBar/>
            <header className={style.header}>
                <SearchBar value={search} onValueChange={setSearch}/>
                <DropDownOptions selected={region} onSelectionChange={setRegion}/>
            </header>
            <main className={style.countries}>
                {
                    countries
                        .filter(country => region === "" || region === country.region)
                        .filter(country => lowerCaseSearch === ""
                            || country.lowerCaseNameIncludes(lowerCaseSearch)
                            || country.lowerCaseCapitalsInclude(lowerCaseSearch))
                        .map(country => <Card key={country.name} country={country}/>)
                        .slice(0, 8)
                }
            </main>
        </>
    )
}

export default App
