import Layout from "../layouts/Layout.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DropDownOptions from "../components/DropDownOptions.jsx";
import Card from "../components/Card.jsx";
import CountriesApi from "../api/CountriesApi.js";
import style from "./MainPage.module.scss";

import {useEffect, useState} from "react";
import {Link} from "react-router";

function MainPage() {
    const [countries, setCountries] = useState([])
    const [region, setRegion] = useState("")
    const [search, setSearch] = useState("")

    useEffect(() => {
        const countriesApi = new CountriesApi(import.meta.env.VITE_COUNTRIES_API)
        countriesApi
            .getAllCountries()
            .then(countryList =>
                countryList.toSorted((a, b) => a.name.localeCompare(b.name)))
            .then(setCountries)
    }, []);

    return (
        <Layout main={
            <>
                <FilterOptions search={search}
                               onSearchChange={setSearch}
                               region={region}
                               onRegionChange={setRegion}/>
                <Countries countries={countries}
                           region={region}
                           search={search}/>
            </>
        }/>
    )
}

function FilterOptions({search, onSearchChange, region, onRegionChange}) {
    return (
        <div className={style.filterOptions}>
            <SearchBar value={search} onValueChange={onSearchChange}/>
            <DropDownOptions selected={region} onSelectionChange={onRegionChange}/>
        </div>
    )
}

function Countries({countries, region, search}) {
    const lowerCaseSearch = search.toLowerCase()
    return (
        <div className={style.countries}>
            {
                countries
                    .filter(country => region === "" || region === country.region)
                    .filter(country => lowerCaseSearch === ""
                        || country.lowerCaseNameIncludes(lowerCaseSearch)
                        || country.lowerCaseCapitalsInclude(lowerCaseSearch))
                    .map(country =>
                        <Link className={style.link} key={country.name} to={`/${country.name}`}>
                            <Card country={country}/>
                        </Link>)
            }
        </div>
    )
}

export default MainPage