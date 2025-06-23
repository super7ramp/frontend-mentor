class Turn {
    readonly #playerCount: 1 | 2 | 3 | 4
    readonly #currentPlayer: number

    constructor(playerCount: 1 | 2 | 3 | 4, currentPlayer: number) {
        this.#playerCount = playerCount
        this.#currentPlayer = currentPlayer
    }

    static initial(playerCount: 1 | 2 | 3 | 4): Turn {
        return new Turn(playerCount, 0)
    }

    played() {
        return new Turn(this.#playerCount, (this.#currentPlayer + 1) % this.#playerCount);
    }

    whose(): 1 | 2 | 3 | 4 {
        // Convert to 1-based index for player number
        return this.#currentPlayer + 1 as 1 | 2 | 3 | 4;
    }
}

export default Turn