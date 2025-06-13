import Country from "../models/Country.js";
import DetailedCountry from "../models/DetailedCountry.js";

/**
 * Represents an API for fetching country data.
 */
export default class CountriesApi {

    #url

    /**
     * Creates an instance of the CountriesApi class.
     *
     * @param url the base URL of the countries API
     */
    constructor(url) {
        this.#url = url;
    }

    /**
     * Fetches all countries from the API.
     * @returns {Promise<Country[]>}
     */
    async getAllCountries() {
        return this
            .#get("all?fields=name,capital,population,flags,region")
            .then((data) => {
                    return data.map(country => new Country({
                                name: country.name.common,
                                capitals: country.capital,
                                population: country.population,
                                flag: country.flags.svg,
                                region: country.region,
                            }
                        )
                    )
                }
            )
    }

    /**
     * Fetches detailed information about a country by its name.
     *
     * @param name the name of the country to fetch details for
     * @returns {Promise<DetailedCountry>}
     */
    async getCountryDetailsByName(name) {
        const query = `name/${name}?fullText=true&fields=name,capital,population,flags,region,nativeName,tld,currencies,languages,borders`;
        return this
            .#get(query)
            .then(async (data) => {
                const countryData = data[0];
                const borders = await Promise.all(countryData.borders.map(code => this.getCountryNameByCode(code)));
                return new DetailedCountry({
                    name: countryData.name.common,
                    capitals: countryData.capital,
                    population: countryData.population,
                    flag: countryData.flags.svg,
                    region: countryData.region,
                    nativeName: countryData.name.nativeName ? Object.values(countryData.name.nativeName)[0].common : "",
                    topLevelDomain: countryData.tld || [],
                    currencies: countryData.currencies ? Object.values(countryData.currencies).map(currency => currency.name) : [],
                    languages: countryData.languages ? Object.values(countryData.languages) : [],
                    borderCountries: borders
                })
            })
    }

    /**
     * Fetches the name of a country by its code.
     *
     * @param code the code of the country to fetch the name for
     * @returns {Promise<String>}
     */
    async getCountryNameByCode(code) {
        return this.#get(`alpha/${code}?fields=name`).then((data) => data.name.common)
    }

    async #get(endpoint) {
        const location = `${this.#url}/${endpoint}`
        return fetch(location).then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data at '${location}'`);
            }
            return response.json();
        })
    }
}
