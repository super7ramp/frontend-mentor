import type Cell from "../models/Cell.ts";
import style from "./GameCell.module.scss"

function GameCell({model, onClick}: { model: Cell, onClick: (_: Cell) => void }) {
    return (
        <button className={`${style.cell} ${style[model.state]}`}
                onClick={() => onClick(model)}>

            {typeof model.value === "number" && <p>{model.value}</p>}
            {typeof model.value === "string" && <img src={`src/assets/icons/icon-${model.value}.svg`} alt={model.value}/>}

        </button>
    )
}

export default GameCell