/**
 * Represents a country with its details.
 */
export default class Country {

    /**
     * Creates an instance of the Country class.
     *
     * @param name the name of the country
     * @param capital the capital city of the country
     * @param population the population of the country
     * @param flag the URL of the country's flag image
     * @param region the region where the country is located
     */
    constructor({name, capital, population, flag, region}) {
        this.name = name;
        this.capital = capital;
        this.population = population;
        this.flag = flag;
        this.region = region;
    }
}
