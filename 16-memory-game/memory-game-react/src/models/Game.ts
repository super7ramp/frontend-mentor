import GameSettings from "./GameSettings.ts";
import Cell from "./Cell.ts";
import {Icons} from "./Icon.ts";
import Turn from "./Turn.ts";
import type {GameActions} from "./GameActions.ts";

/**
 * Base class for the game state machine.
 */
abstract class Game {

    /** The game settings, such as grid size */
    readonly settings

    /** The grid of cells, where each cell is either hidden, shown, or found. */
    readonly cells: Cell[][]

    /** Information about the current turn. */
    readonly turn: Turn

    /** Functions that can be used by the game state machine to perform actions, such as scheduling a timeout. */
    protected actions: GameActions

    protected constructor(settings: GameSettings,
                          cells: Cell[][],
                          turn: Turn,
                          actions: GameActions) {
        this.settings = settings
        this.cells = cells
        this.turn = turn
        this.actions = actions
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
     * Checks if the game is finished or about to be, meaning no cell is hidden.
     */
    isFinished(): boolean {
        for (let y = 0; y < this.cells.length; y++) {
            for (let x = 0; x < this.cells[y].length; x++) {
                const cell = this.cells[y][x]
                if (cell.state === "hidden") {
                    return false
                }
            }
        }
        return true
    }

    /**
     * Restarts the game, resetting the state to the initial state.
     *
     * @returns a new game instance with the initial state
     */
    restart(): Game {
        for (let y = 0; y < this.cells.length; y++) {
            for (let x = 0; x < this.cells[y].length; x++) {
                this.cells[y][x] = Cell.newHidden(x, y, this.cells[y][x].value)
            }
        }
        const initialTurn = Turn.initial(this.settings.players)
        this.actions.resetStats()
        return new GameReady(this.settings, this.cells, initialTurn, this.actions)
    }

    whoseTurn(): 1 | 2 | 3 | 4 {
        return this.turn.whose()
    }

    /**
     * Called after a timeout.
     *
     * @returns the next game state, or this instance if there is no state change
     */
    abstract onTimeout(): Game;

    /**
     * Called when the user clicks on a cell.
     *
     * @param cell the cell that was clicked
     * @returns the next game state, or this instance if there is no state change
     */
    abstract onUserClick(cell: Cell): Game;

}

/**
 * The game is ready to start, waiting for the user to pick the first cell.
 */
class GameReady extends Game {

    constructor(settings: GameSettings,
                cells: Cell[][],
                turn: Turn,
                actions: GameActions) {
        super(settings, cells, turn, actions)
    }

    onUserClick(cell: Cell): Game {
        if (cell.state !== "hidden") {
            return this
        }
        const updatedCell = cell.show()
        this.cells[cell.y][cell.x] = updatedCell
        this.actions.recordPlayerMove(this.turn.whose())
        return new GameUserPickedFirst(this.settings, this.cells, this.turn, this.actions, updatedCell)
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
                turn: Turn,
                actions: GameActions,
                firstCell: Cell) {
        super(settings, cells, turn, actions)
        this.firstCell = firstCell
    }

    onUserClick(cell: Cell): Game {
        if (cell.state !== "hidden" || cell === this.firstCell) {
            return this
        }
        const updatedCell = cell.show()
        this.cells[cell.y][cell.x] = updatedCell
        const newState = new GameUserPickedSecond(this.settings, this.cells, this.turn, this.actions, this.firstCell, updatedCell)
        this.actions.recordPlayerMove(this.turn.whose())
        this.actions.scheduleTimeout()
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
                turn: Turn,
                actions: GameActions,
                firstCell: Cell,
                secondCell: Cell) {
        super(settings, cells, turn, actions)
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
            const nextTurn = this.turn.played()
            return new GameReady(this.settings, this.cells, nextTurn, this.actions)
        }

        this.cells[this.firstCell.y][this.firstCell.x] = this.firstCell.found()
        this.cells[this.secondCell.y][this.secondCell.x] = this.secondCell.found()
        this.actions.recordPlayerFoundAPair(this.turn.whose())

        if (this.isFinished()) {
            return new GameFinished(this.settings, this.cells, this.turn, this.actions)
        }

        return new GameReady(this.settings, this.cells, this.turn, this.actions)
    }
}

/**
 * The game is finished, all cells have been found.
 */
class GameFinished extends Game {

    constructor(settings: GameSettings,
                cells: Cell[][],
                turn: Turn,
                actions: GameActions) {
        super(settings, cells, turn, actions)
        this.actions.recordGameFinished()
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
 * @param actions functions that can be  to by the game state machine to perform actions, e.g. scheduling a timeout
 * @returns a new game instance
 */
function newGame(settings: GameSettings, actions: GameActions): Game {
    const gridSize = settings.gridSizeAsNumber()
    const valueGenerator = settings.theme === "Numbers"
        ? (n: number) => n + 1
        : (n: number) => Icons[n % Icons.length];

    const values = new Array(gridSize * gridSize)
    for (let n = 0; (2 * n + 1) < values.length; n++) {
        const value = valueGenerator(n);
        values[2 * n] = value;
        values[2 * n + 1] = value;
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

    const initialTurn = Turn.initial(settings.players)

    return new GameReady(settings, cells, initialTurn, actions)
}


export default Game
export {newGame}