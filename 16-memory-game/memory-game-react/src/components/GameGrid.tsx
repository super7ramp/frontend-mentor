import GameCell from "./GameCell"
import style from "./GameGrid.module.scss"
import Game from "../models/Game.ts";
import type Cell from "../models/Cell.ts";

function GameGrid({game, onGameUpdated}: { game: Game, onGameUpdated: (_: Game) => void }) {

    const onCellClicked = (cell: Cell) => {
        const updatedGame = game.onUserClick(cell)
        if (game !== updatedGame) {
            onGameUpdated(updatedGame)
        }
    }

    return (
        <div className={style.gameGrid} data-grid-size={game.gridSize()}>
            {game.cells
                .map(((row, rowIndex) => row
                    .map(((cell, columnIndex) =>
                            <GameCell key={`${rowIndex}+${columnIndex}-${cell.value}`}
                                      model={cell}
                                      onClick={onCellClicked}/>

                    ))))}
        </div>
    )
}


export default GameGrid
