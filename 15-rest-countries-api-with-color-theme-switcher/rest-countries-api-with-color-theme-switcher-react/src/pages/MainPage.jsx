import Layout from "../layouts/Layout.jsx";
import SearchBar from "../components/SearchBar.jsx";
import DropDownOptions from "../components/DropDownOptions.jsx";
import Card from "../components/Card.jsx";
import CountriesApi from "../api/CountriesApi.js";
import style from "./MainPage.module.scss";

import {useEffect, useState} from "react";
import {Link} from "react-router";

/**
 * Page that serves as the main entry point of the application.
 * @returns {JSX.Element}
 * @constructor
 */
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

/**
 * FilterOptions component that provides a search bar and a dropdown to filter countries by region.
 *
 * @param search {string} - The current search value.
 * @param onSearchChange {function} - Callback function to handle search value changes.
 * @param region {string} - The currently selected region.
 * @param onRegionChange {function} - Callback function to handle region selection changes.
 * @returns {JSX.Element}
 * @constructor
 */
function FilterOptions({search, onSearchChange, region, onRegionChange}) {
    return (
        <div className={style.filterOptions}>
            <SearchBar value={search} onValueChange={onSearchChange}/>
            <DropDownOptions selected={region} onSelectionChange={onRegionChange}/>
        </div>
    )
}

/**
 * Countries component that displays a list of country cards.
 *
 * @param countries {Country[]} - List of countries to display.
 * @param region {string} - The currently selected region to filter countries.
 * @param search {string} - The current search value to filter countries by name or capital.
 * @returns {JSX.Element}
 * @constructor
 */
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