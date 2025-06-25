import {StatCount} from "./Stat.tsx";
import style from "./MenuStatsMultiplayer.module.scss"

function MenuStatsMultiplayer({players}: { players: Array<{ id: number, pairs: number }> }) {
    return (
        <div className={style.menuMultiplayer}>
            {players.map(player =>
                <PlayerCard key={`card-${player.id}`} id={player.id} pairs={player.pairs}/>
            )}
        </div>
    )
}

function PlayerCard({id, pairs}: { id: number, pairs: number }) {
    return (
        <div className={style.playerCard}>
            <StatCount label={`P${id}`} count={pairs} direction="column"/>
        </div>
    )
}

export default MenuStatsMultiplayer