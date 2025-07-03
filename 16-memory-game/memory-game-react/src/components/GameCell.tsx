import type Cell from "../models/Cell.ts";
import style from "./GameCell.module.scss"

/**
 * {@link GameCell} is a component that represents a single cell in the game grid.
 * @param model - the model of the cell, which contains its state and value
 * @param onClick - a callback function to be called when the cell is clicked
 * @constructor
 */
function GameCell({model, onClick}: { model: Cell, onClick: (_: Cell) => void }) {
    return (
        <button className={`${style.cell} ${style[model.state]}`}
                onClick={() => onClick(model)}>

            {typeof model.value === "number" && <p>{model.value}</p>}
            {typeof model.value === "string" && <img src={`/icon-${model.value}.svg`} alt={model.value}/>}

        </button>
    )
}

export default GameCell