import {StatCount} from "./Stat.tsx";
import style from "./MenuStatsMultiplayer.module.scss"

function MenuStatsMultiplayer({players}: { players: Array<{ id: number, moves: number }> }) {
    return (
        <div className={style.menuMultiplayer}>
            {players.map(player =>
                <PlayerCard key={`card-${player.id}`} id={player.id} moves={player.moves}/>
            )}
        </div>
    )
}

function PlayerCard({id, moves}: { id: number, moves: number }) {
    return (
        <div className={style.playerCard}>
            <StatCount label={`P${id}`} count={moves} direction="column"/>
        </div>
    )
}

export default MenuStatsMultiplayer