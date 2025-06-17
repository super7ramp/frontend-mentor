import type Cell from "../models/Cell.ts";
import style from "./GameCell.module.scss"

function GameCell({model, onClick}: {model: Cell, onClick: (_: Cell) => void}) {
    return (
        <button className={`${style.cell} ${classForState(model.state)}`}
                onClick={() => onClick(model)}>
            <p>{model.numberValue()}</p>
        </button>
    )
}

function classForState(state: "hidden" | "shown" | "found") {
    switch (state) {
        case "hidden":
            return style.cellHidden
        case "shown":
            return style.cellShown
        case "found":
            return style.cellFound
        default:
            throw Error(`Unknown state ${state}`)
    }
}

export default GameCell