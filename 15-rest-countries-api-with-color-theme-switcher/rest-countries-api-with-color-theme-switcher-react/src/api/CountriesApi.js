import Country from "../models/Country.js";

export default class CountriesApi {

    #url

    constructor(url) {
        this.#url = url;
    }

    async getAll() {
        return this.#get(`all`)
    }

    async getByName(name) {
        return this
            .#get(`name/${name}`)
            .then(([data]) => {
                console.log("Country data:", data);
                const country = new Country({
                    name,
                    capital: data.capital,
                    population: data.population,
                    flag: data.flags.svg,
                    region: data.region,
                })
                console.log("Created Country instance:", country)
                return country
            })
    }

    #get(query) {
        return fetch(`${this.#url}/${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching country by name: ${name}`);
                }
                console.log("Response", response);
                return response.json();
            })
    }
}
