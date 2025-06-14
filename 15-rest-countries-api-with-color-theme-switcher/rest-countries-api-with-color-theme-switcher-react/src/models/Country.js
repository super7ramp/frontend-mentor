/**
 * Represents a country with basic information.
 */
export default class Country {

    #lowerCaseName
    #lowerCaseCapitals

    /**
     * Creates an instance of the Country class.
     *
     * @param name {string} the name of the country
     * @param capitals {string[]} the capital cities of the country
     * @param population {number} the population of the country
     * @param flag {string} the URL of the country's flag image
     * @param region {string} the region where the country is located
     */
    constructor({name, capitals, population, flag, region}) {
        this.name = name
        this.#lowerCaseName = name.toLowerCase()
        this.capitals = capitals
        this.#lowerCaseCapitals = capitals.map(capital => capital.toLowerCase())
        this.population = population
        this.flag = flag
        this.region = region
    }

    lowerCaseNameIncludes(otherName) {
        return this.#lowerCaseName.includes(otherName)
    }

    lowerCaseCapitalsInclude(otherCapital) {
        const otherCapitalLowerCase = otherCapital;
        return this.#lowerCaseCapitals.some(capital => capital.includes(otherCapitalLowerCase))
    }
}
