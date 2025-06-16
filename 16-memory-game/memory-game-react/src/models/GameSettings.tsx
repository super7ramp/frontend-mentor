/**
 * Settings for the memory game.
 */
class GameSettings {
    readonly theme: "Icons" | "Numbers";
    readonly players: 1 | 2 | 3 | 4;
    readonly gridSize: "4x4" | "6x6";

    /**
     * Creates a new GameSettings instance with the specified values.
     *
     * @param theme the theme of the game
     * @param players the number of players
     * @param gridSize the size of the grid
     */
    constructor(
        theme: "Icons" | "Numbers",
        players: 1 | 2 | 3 | 4,
        gridSize: "4x4" | "6x6",
    ) {
        this.theme = theme;
        this.players = players;
        this.gridSize = gridSize;
    }

    /**
     * Creates a new GameSettings instance with default values.
     */
    static defaults() {
        return new GameSettings("Icons", 1, "4x4");
    }

    /**
     * Creates a new GameSettings instance with the same values as this instance except for the specified theme.
     * @param theme the new theme
     * @returns a new GameSettings instance with the specified theme
     */
    withTheme(theme: "Icons" | "Numbers"): GameSettings {
        return new GameSettings(theme, this.players, this.gridSize);
    }

    /**
     * Creates a new GameSettings instance with the same values as this instance except for the specified number of
     * players.
     * @param players the new number of players
     * @returns a new GameSettings instance with the specified number of players
     */
    withPlayers(players: 1 | 2 | 3 | 4): GameSettings {
        return new GameSettings(this.theme, players, this.gridSize);
    }

    /**
     * Creates a new GameSettings instance with the same values as this instance except for the specified grid size.
     * @param gridSize the new grid size
     * @returns a new GameSettings instance with the specified grid size
     */
    withGridSize(gridSize: "4x4" | "6x6"): GameSettings {
        return new GameSettings(this.theme, this.players, gridSize);
    }
}

export default GameSettings