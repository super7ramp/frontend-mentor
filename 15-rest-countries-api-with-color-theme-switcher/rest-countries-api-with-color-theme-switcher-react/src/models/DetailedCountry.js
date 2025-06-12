/**
 * Represents a country with its details.
 */
export default class DetailedCountry {

    /**
     * Creates an instance of the Country class.
     *
     * @param name the name of the country
     * @param capitals the capital cities of the country
     * @param population the population of the country
     * @param flag the URL of the country's flag image
     * @param region the region where the country is located
     * @param nativeName the native name of the country
     * @param topLevelDomain the top-level domain of the country
     * @param currencies the currencies used in the country
     * @param languages the languages spoken in the country
     * @param borderCountries the names of the countries that share a border with this country
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
