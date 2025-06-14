/**
 * Represents a country with its details.
 */
export default class DetailedCountry {

    /**
     * Creates an instance of the Country class.
     *
     * @param name {string} the name of the country
     * @param capitals {string[]} the capital cities of the country
     * @param population {number} the population of the country
     * @param flag {string} the URL of the country's flag image
     * @param region {string} the region where the country is located
     * @param nativeName {string} the native name of the country
     * @param topLevelDomain {string} the top-level domain of the country
     * @param currencies {string[]} the currencies used in the country
     * @param languages {string[]} the languages spoken in the country
     * @param borderCountries {string[]} the names of the countries that share a border with this country
     */
    constructor({
                    name,
                    capitals,
                    population,
                    flag,
                    region,
                    nativeName,
                    topLevelDomain,
                    currencies,
                    languages,
                    borderCountries
                }) {
        this.name = name;
        this.capitals = capitals;
        this.population = population;
        this.flag = flag;
        this.region = region;
        this.nativeName = nativeName;
        this.topLevelDomain = topLevelDomain;
        this.currencies = currencies;
        this.languages = languages;
        this.borders = borderCountries;
    }

}
