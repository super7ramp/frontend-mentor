import {beforeEach, describe, expect, it, vi} from 'vitest';
import Game, {GameFinished, GameUserPickedFirst, GameUserPickedSecond, newGame} from './Game';
import GameSettings from "./GameSettings.ts";
import type {GameActions} from "./GameActions.ts";
import type Cell from "./Cell.ts";

let mockedActions: GameActions;

beforeEach(async () => {
    mockedActions = mockActions()
})

describe('GameReady', () => {

    it('initializes', () => {
        const game = gameReady()

        expect(game.whoseTurn()).toEqual(1)
        expect(game.isFinished()).toBe(false)
        expect(game.cells.every(cell => cell.every(cell => cell.state == "hidden"))).toBe(true)
    })

    it('allows a player to click a cell', () => {
        const game = gameReady()

        const updatedGame = game.onUserClick(game.cells[0][0])

        expect(updatedGame).not.toBe(game)
        expect(updatedGame.cells[0][0].state).toBe("shown")
        expect(mockedActions.recordPlayerMove).toHaveBeenCalledWith(1)
    })
})

describe('GameUserPickedFirst', () => {

    it('does nothing when user clicks on same cell', () => {
        const game = gameUsePickedFirst()

        const updatedGame = game.onUserClick(game.cells[0][0])

        expect(updatedGame).toBe(game)
        expect(mockedActions.recordPlayerMove).not.toHaveBeenCalled()
    })

    it('allows a player to click a second cell', () => {
        const game = gameUsePickedFirst()

        const updatedGame = game.onUserClick(game.cells[0][1])

        expect(updatedGame).not.toBe(game)
        expect(mockedActions.recordPlayerMove).toHaveBeenCalledWith(1)
    })
})

describe('GameUserPickedSecond', () => {

    it('hides both cells upon timeout, if they are not a pair', () => {
        const game = gameUsePickedSecondDifferent()

        const updatedGame = game.onTimeout()

        expect(updatedGame).not.toBe(game)
        expect(updatedGame.cells[game.firstCell.y][game.firstCell.y].state).toBe("hidden")
        expect(updatedGame.cells[game.secondCell.y][game.secondCell.y].state).toBe("hidden")
        expect(mockedActions.recordPlayerFoundAPair).not.toHaveBeenCalled
    })

    it('marks both cells as found upon timeout, if they are a pair', () => {
        const game = gameUsePickedSecondSame()

        const updatedGame = game.onTimeout()

        expect(updatedGame).not.toBe(game)
        expect(updatedGame.cells[game.firstCell.y][game.firstCell.x].state).toBe("found")
        expect(updatedGame.cells[game.secondCell.y][game.secondCell.x].state).toBe("found")
        expect(mockedActions.recordPlayerFoundAPair).toHaveBeenCalledWith(1)
    })

    it('marks game as finish upon timeout, if they are a pair and no more cell is hidden', () => {
        const game = gameUserPickedSecondFinishingGame()

        const updatedGame = game.onTimeout()

        expect(updatedGame).not.toBe(game)
        expect(updatedGame.cells[game.firstCell.y][game.firstCell.x].state).toBe("found")
        expect(updatedGame.cells[game.secondCell.y][game.secondCell.x].state).toBe("found")
        expect(updatedGame.isFinished()).toBe(true)
        expect(mockedActions.recordPlayerFoundAPair).toHaveBeenCalledWith(1)
        expect(mockedActions.recordGameFinished).toHaveBeenCalled
    })

    it('does nothing when user clicks', () => {
        const game = gameUsePickedSecondSame()
        const cell = findHiddenCell(game)

        const updatedGame = game.onUserClick(cell)

        expect(updatedGame).toBe(game)
        expect(mockedActions.recordPlayerMove).not.toHaveBeenCalled()
    })
})

describe('GameFinished', () => {

    it('does nothing when user clicks', () => {
        const game = gameFinished()

        const updatedGame = game.onUserClick(game.cells[0][0])

        expect(updatedGame).toBe(game)
        expect(mockedActions.recordPlayerMove).not.toHaveBeenCalled()
    })

})

// fixtures below

function gameReady() {
    return newGame(GameSettings.defaults(), mockedActions)
}

function gameUsePickedFirst() {
    const initialGame = gameReady()
    const cell = initialGame.cells[0][0]
    const game = initialGame.onUserClick(cell)
    expect(mockedActions.recordPlayerMove).toHaveBeenCalledWith(1)
    vi.clearAllMocks()
    return game as GameUserPickedFirst
}

function gameUsePickedSecondSame() {
    const initialGame = gameUsePickedFirst()
    const secondCell = findHiddenCellWithValue(initialGame, initialGame.cells[0][0].value)
    const updatedGame = initialGame.onUserClick(secondCell) as GameUserPickedSecond
    expect(mockedActions.recordPlayerMove).toHaveBeenCalledWith(1)
    vi.clearAllMocks()
    return updatedGame
}

function gameUsePickedSecondDifferent() {
    const initialGame = gameUsePickedFirst()
    const secondCell = findHiddenCellWithValueNot(initialGame, initialGame.cells[0][0].value)
    const updatedGame = initialGame.onUserClick(secondCell) as GameUserPickedSecond
    expect(mockedActions.recordPlayerMove).toHaveBeenCalledWith(1)
    vi.clearAllMocks()
    return updatedGame
}

function gameUserPickedSecondFinishingGame() {
    const initialGame = gameUsePickedSecondSame()
    const firstCell = initialGame.firstCell
    const secondCell = initialGame.secondCell
    const cells = initialGame.cells.map(row => row.map(cell =>
        (cell !== firstCell && cell !== secondCell) ? cell.show().found() : cell))
    return new GameUserPickedSecond(initialGame.settings, cells, initialGame.turn, mockedActions, firstCell, secondCell)
}

function gameFinished(): GameFinished {
    const initialGame = gameUserPickedSecondFinishingGame()
    vi.clearAllMocks()
    return initialGame.onTimeout()
}

function findHiddenCell(game: Game) {
    return findCell(game, cell => cell.state === "hidden")
}

function findHiddenCellWithValue(game: Game, value: number | string) {
    return findCell(game, cell => cell.state === "hidden" && cell.value === value)
}

function findHiddenCellWithValueNot(game: Game, value: number | string) {
    return findCell(game, cell => cell.state === "hidden" && cell.value !== value)
}

function findCell(game: Game, predicate: (cell: Cell) => boolean) {
    for (let y = 0; y < game.cells.length; y++) {
        for (let x = 0; x < game.cells[y].length; x++) {
            const cell = game.cells[y][x]
            if (predicate(cell)) {
                return cell
            }
        }
    }
    throw Error("No cell found matching the predicate")
}

function mockActions(): GameActions {
    return {
        scheduleTimeout: vi.fn(),
        recordPlayerMove: vi.fn(),
        recordPlayerFoundAPair: vi.fn(),
        recordTurnFinished: vi.fn(),
        recordGameFinished: vi.fn(),
        resetStats: vi.fn(),
    }
}
