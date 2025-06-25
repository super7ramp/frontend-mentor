import style from "./MenuStatsMultiplayer.module.scss"
import type {PlayerStat} from "../models/PlayerStats.ts";
import {StatCount} from "./Stat.tsx";

function MenuStatsMultiplayer({playerStats}: { playerStats: PlayerStat[] }) {
    return (
        <div className={style.menuMultiplayer}>
            {playerStats.map(player =>
                <PlayerCard key={`card-${player.id}`} id={player.id} pairs={player.pairs} isCurrent={player.isCurrent}/>
            )}
        </div>
    )
}

function PlayerCard({id, pairs, isCurrent}: { id: number, pairs: number, isCurrent: boolean }) {
    return (
        <div className={style.playerCard}>
            <StatCount label={`P${id}`}
                       count={pairs}
                       direction="column"
                       variant={isCurrent ? "current" : undefined}/>
        </div>
    )
}

export default MenuStatsMultiplayer