import Layout from "../layouts/Layout.jsx";
import style from "./DetailsPage.module.scss";
import CountriesApi from "../api/CountriesApi.js";

import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";

/**
 * Page that displays detailed information about a specific country.
 *
 * Name of the country is obtained from the URL parameter "countryName".
 *
 * @returns {JSX.Element}
 * @constructor
 */
function DetailsPage() {
    const name = useParams().countryName;
    const [detailedCountry, setDetailedCountry] = useState(null)

    useEffect(() => {
        const countriesApi = new CountriesApi(import.meta.env.VITE_COUNTRIES_API)
        countriesApi
            .getCountryDetailsByName(name)
            .then(setDetailedCountry)
    }, [name]);

    return (
        <Layout main={
            <div className={style.outerContainer}>
                <div className={style.innerContainer}>
                    <Navigation/>
                    <CountryDetails detailedCountry={detailedCountry}/>
                </div>
            </div>
        }/>
    )
}

/**
 * Navigation component that provides a back button to return to the main page.
 *
 * @returns {JSX.Element}
 * @constructor
 */
function Navigation() {
    return (
        <nav>
            <Link to="/">
                <button className={style.backButton} type="button">Back</button>
            </Link>
        </nav>
    )
}

/**
 * CountryDetails component that displays detailed information about a specific country.
 *
 * @param detailedCountry {DetailedCountry} - The detailed country object
 * @returns {JSX.Element}
 * @constructor
 */
function CountryDetails({detailedCountry}) {
    return (
        detailedCountry
            ? <article className={style.countryDetails}>
                <img className={style.flag} loading="lazy" src={detailedCountry.flag} alt={detailedCountry.name}/>
                <div className={style.nameAndDetails}>
                    <h1>{detailedCountry.name}</h1>
                    <div className={style.details}>
                        <div>
                            <p><span className={style.key}>Native name:</span> {detailedCountry.nativeName}</p>
                            <p><span className={style.key}>Population:</span> {detailedCountry.population.toLocaleString("en")}</p>
                            <p><span className={style.key}>Region:</span> {detailedCountry.region}</p>
                            <p><span className={style.key}>Capital:</span> {detailedCountry.capitals.join(", ")}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span className={style.key}>Top Level Domain:</span> {detailedCountry.topLevelDomain}
                            </p>
                            <p><span
                                className={style.key}>Currencies:</span> {detailedCountry.currencies.join(", ")}
                            </p>
                            <p><span
                                className={style.key}>Languages:</span> {detailedCountry.languages.join(", ")}
                            </p>
                        </div>
                        <BorderCountries borders={detailedCountry.borders}/>
                    </div>
                </div>
            </article>
            : <p>Loading...</p>
    )
}

function BorderCountries({borders}) {
    return (
        <section className={style.borderCountriesSection}>
            <h2>Border Countries:</h2>
            <ul className={style.borderCountries}>
                {borders?.map((border) => (
                    <li key={border}>
                        <Link to={`/${border}`}>
                            <button className={style.buttonBorderCountry} type="button">{border}</button>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default DetailsPage