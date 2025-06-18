import type GameSettings from "./GameSettings.ts";
import Cell from "./Cell.ts";

/**
 * Base class for the game state machine.
 */
abstract class Game {

    /** The game settings, such as grid size */
    readonly settings

    /** The grid of cells, where each cell is either hidden, shown, or found. */
    readonly cells: Cell[][]

    protected scheduleTimeout: () => void

    protected constructor(settings: GameSettings, cells: Cell[][], scheduleTimeout: () => void) {
        this.settings = settings
        this.cells = cells
        this.scheduleTimeout = scheduleTimeout
    }

    /**
     * Returns the grid size as a string, e.g. "4x4" or "6x6".
     *
     * @returns the grid size
     */
    gridSize(): string {
        return this.settings.gridSize
    }

    /**
     * Called after a timeout.
     *
     * @returns the next game state
     */
    abstract onTimeout(): Game;

    /**
     * Called when the user clicks on a cell.
     *
     * @param cell the cell that was clicked
     * @returns the next game state
     */
    abstract onUserClick(cell: Cell): Game;

}

/**
 * The game is ready to start, waiting for the user to pick the first cell.
 */
class GameReady extends Game {

    constructor(settings: GameSettings,
                cells: Cell[][],
                scheduleTimeout: () => void) {
        super(settings, cells, scheduleTimeout)
    }

    onUserClick(cell: Cell): Game {
        if (cell.state !== "hidden") {
            return this
        }
        const updatedCell = cell.show()
        this.cells[cell.y][cell.x] = updatedCell
        return new GameUserPickedFirst(this.settings, this.cells, this.scheduleTimeout, updatedCell)
    }

    onTimeout(): Game {
        return this
    }
}

/**
 * The user has picked the first cell, waiting for the second cell to be picked.
 */
class GameUserPickedFirst extends Game {
    readonly firstCell: Cell

    constructor(settings: GameSettings,
                cells: Cell[][],
                setTimeout: () => void,
                firstCell: Cell) {
        super(settings, cells, setTimeout)
        this.firstCell = firstCell
    }

    onUserClick(cell: Cell): Game {
        if (cell.state !== "hidden" || cell === this.firstCell) {
            return this
        }
        const updatedCell = cell.show()
        this.cells[cell.y][cell.x] = updatedCell
        const newState = new GameUserPickedSecond(this.settings, this.cells, this.scheduleTimeout, this.firstCell, updatedCell)
        this.scheduleTimeout()
        return newState
    }

    onTimeout(): Game {
        return this
    }
}

/**
 * The user has picked the second cell, checking if it matches the first cell.
 */
class GameUserPickedSecond extends Game {
    readonly firstCell: Cell
    readonly secondCell: Cell

    constructor(settings: GameSettings,
                cells: Cell[][],
                scheduleTimeout: () => void,
                firstCell: Cell,
                secondCell: Cell) {
        super(settings, cells, scheduleTimeout)
        this.firstCell = firstCell
        this.secondCell = secondCell
    }

    onUserClick(_cell: Cell): Game {
        // Prevent user interaction while showing this transient state
        return this
    }

    onTimeout(): Game {
        if (this.firstCell.value != this.secondCell.value) {
            this.cells[this.firstCell.y][this.firstCell.x] = this.firstCell.hide()
            this.cells[this.secondCell.y][this.secondCell.x] = this.secondCell.hide()
            return new GameReady(this.settings, this.cells, this.scheduleTimeout)
        }

        this.cells[this.firstCell.y][this.firstCell.x] = this.firstCell.found()
        this.cells[this.secondCell.y][this.secondCell.x] = this.secondCell.found()
        for (let y = 0; y < this.cells.length; y++) {
            for (let x = 0; x < this.cells[y].length; x++) {
                const cell = this.cells[y][x]
                if (cell.state !== "found") {
                    return new GameReady(this.settings, this.cells, this.scheduleTimeout)
                }
            }
        }

        return new GameFinished(this.settings, this.cells, this.scheduleTimeout)
    }
}

/**
 * The game is finished, all cells have been found.
 */
class GameFinished extends Game {

    constructor(settings: GameSettings,
                cells: Cell[][],
                scheduleTimeout: () => void) {
        super(settings, cells, scheduleTimeout)
    }

    onUserClick(_cell: Cell): Game {
        return this
    }

    onTimeout(): Game {
        return this
    }
}

/**
 * Creates a new game with the specified settings.
 *
 * @param settings the game settings
 * @param scheduleTimeout a function to schedule a timeout event, used to delay the transition between game states
 * @returns a new game instance
 */
function newGame(settings: GameSettings, scheduleTimeout: () => void): Game {
    const gridSize = settings.gridSizeAsNumber()
    const values = new Array(gridSize * gridSize)
    for (let n = 0; (2 * n + 1) < values.length; n++) {
        values[2 * n] = n + 1;
        values[2 * n + 1] = n + 1;
    }
    const cells = new Array(gridSize)
    for (let y = 0; y < gridSize; y++) {
        cells[y] = new Array(gridSize)
        for (let x = 0; x < gridSize; x++) {
            const randomPos = Math.floor(Math.random() * values.length)
            cells[y][x] = Cell.newHidden(x, y, values[randomPos])
            values.splice(randomPos, 1)
        }
    }
    return new GameReady(settings, cells, scheduleTimeout)
}


export default Game
export {newGame}