import Country from "../models/Country.js";

export default class CountriesApi {

    #url

    constructor(url) {
        this.#url = url;
    }

    async getAll() {
        return fetch(`${this.#url}/all?fields=name,capital,population,flags,region`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching country by name: ${name}`);
                }
                return response.json();
            })
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
}
