/**
 * The model for a single cell in the memory game. Instances are immutable.
 */
class Cell {
    /** The x coordinate of the cell in the grid */
    readonly x: number
    /** The y coordinate of the cell in the grid */
    readonly y: number
    /** The value of the cell, either a number or a URL for an icon */
    readonly value: Number | URL
    /** The state of the cell, can be "hidden", "shown" or "found" */
    readonly state: "hidden" | "shown" | "found"

    constructor(x: number, y: number, value: Number | URL, state: "hidden" | "shown" | "found") {
        this.x = x
        this.y = y
        this.value = value
        this.state = state
    }

    /**
     * Creates a new hidden cell with the specified coordinates, value.
     *
     * @param x the x coordinate of the cell in the grid
     * @param y the y coordinate of the cell in the grid
     * @param value the value of the cell, either a number or a URL for an icon
     */
    static newHidden(x: number, y: number, value: Number | URL) {
        return new Cell(x, y, value, "hidden")
    }

    /**
     * Creates a new shown cell at this cell's coordinates and with this cell value.
     *
     * @returns a new Cell instance with the state "shown"
     */
    show() {
        if (this.state != "hidden") {
            throw Error("Trying to show a cell not hidden")
        }
        return new Cell(this.x, this.y, this.value, "shown")
    }

    /**
     * Creates a new hidden cell at this cell's coordinates and with this cell value.
     *
     * @returns a new Cell instance with the state "hidden"
     */
    hide() {
        if (this.state != "shown") {
            throw Error("Trying to hide a cell not shown")
        }
        return new Cell(this.x, this.y, this.value, "hidden");
    }

    /**
     * Creates a new found cell at this cell's coordinates and with this cell value.
     *
     * @returns a new Cell instance with the state "found"
     */
    found() {
        if (this.state != "shown") {
            throw Error("Trying to mark a cell not shown as found")
        }
        return new Cell(this.x, this.y, this.value, "found");
    }

    /**
     * Returns the value of the cell as a number.
     *
     * @returns the value of the cell as a number
     * @throws Error if the value is not a number
     */
    numberValue() {
        return this.value as number
    }

}

export default Cell