import MenuBar from "../components/MenuBar.jsx";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router";

import style from "./DetailsPage.module.scss";
import CountriesApi from "../api/CountriesApi.js";

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
        <>
            <MenuBar/>
            <nav>
                <Link to="/">
                    <button className={style.backButton} type="button">Back</button>
                </Link>
            </nav>
            <main>
                {detailedCountry
                    ? <>
                        <img className={style.flag} src={detailedCountry.flag} alt={detailedCountry.name}/>
                        <section className={style.nameAndDetails}>
                            <h1>{detailedCountry.name}</h1>
                            <div className={style.details}>
                                <div>
                                    <p><span className={style.key}>Native name:</span> {detailedCountry.nativeName}</p>
                                    <p><span className={style.key}>Population:</span> {detailedCountry.population}</p>
                                    <p><span className={style.key}>Region:</span> {detailedCountry.region}</p>
                                    <p><span className={style.key}>Capital:</span> {detailedCountry.capitals.join(", ")}</p>
                                </div>
                                <div>
                                    <p>
                                    <span
                                        className={style.key}>Top Level Domain:</span> {detailedCountry.topLevelDomain}
                                    </p>
                                    <p><span className={style.key}>Currencies:</span> {detailedCountry.currencies.join(", ")}</p>
                                    <p><span className={style.key}>Languages:</span> {detailedCountry.languages.join(", ")}</p>
                                </div>
                                <BorderCountries borders={detailedCountry.borders}/>
                            </div>
                        </section>
                    </>
                    : <p>Loading...</p>
                }
            </main>
        </>
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