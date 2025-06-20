import style from './MenuSolo.module.scss'
import {StatCount, StatTime} from "./Stat.tsx";

function MenuSolo({timeInSeconds, moves}: { timeInSeconds: number, moves: number }) {
    return (
        <div className={style.menuSolo}>
            <StatTime label="Time" timeInSeconds={timeInSeconds}/>
            <StatCount label="Moves" count={moves}/>
        </div>
    )
}

export default MenuSolo
