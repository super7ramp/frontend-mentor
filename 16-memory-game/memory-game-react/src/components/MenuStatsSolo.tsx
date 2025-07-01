import style from './MenuStatsSolo.module.scss'
import {StatCount, StatTime} from "./Stat.tsx";

function MenuStatsSolo({timeInSeconds, moves}: { timeInSeconds: number, moves: number }) {
    return (
        <div className={style.menuSolo}>
            <StatTime label="Time" timeInSeconds={timeInSeconds} big/>
            <StatCount label="Moves" count={moves} big/>
        </div>
    )
}

export default MenuStatsSolo
