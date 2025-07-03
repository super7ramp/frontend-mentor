import style from "./MenuStatsMultiplayer.module.scss"
import type {PlayerStat} from "../models/PlayerStats.ts";
import {StatCount} from "./Stat.tsx";

/**
 * {@link MenuStatsMultiplayer} is a component that displays the statistics of players in a multiplayer game.
 * @param playerStats - an array of player statistics, each containing the player's id, pairs found, and whether they are the current player
 * @constructor
 */
function MenuStatsMultiplayer({playerStats}: { playerStats: PlayerStat[] }) {
    return (
        <div className={style.menuMultiplayer}>
            {playerStats.map(player =>
                <PlayerCard key={`card-${player.id}`} id={player.id} pairs={player.pairs} isCurrent={player.isCurrent}/>
            )}
        </div>
    )
}

/**
 * {@link PlayerCard} is a component that displays the statistics of a single player in a multiplayer game.
 * @param id - the player's id
 * @param pairs - the number of pairs found by the player
 * @param isCurrent - whether the player is the current player
 * @constructor
 */
function PlayerCard({id, pairs, isCurrent}: { id: number, pairs: number, isCurrent: boolean }) {
    return (
        <>
            <div className={style.playerCard}>
                <StatCount label={`P${id}`}
                           count={pairs}
                           direction="column"
                           variant={isCurrent ? "current" : undefined}/>
            </div>
            <div className={style["playerCard--tablet"]}>
                <StatCount label={`Player ${id}`}
                           count={pairs}
                           direction="column"
                           variant={isCurrent ? "current" : undefined}/>
            </div>
            <div className={style["playerCard--desktop"]}>
                <StatCount label={`Player ${id}`}
                           count={pairs}
                           direction="row"
                           variant={isCurrent ? "current" : undefined}/>
                {isCurrent && <p className={style.currentTurnLabel}>Current turn</p>}
            </div>
        </>
    )
}

export default MenuStatsMultiplayer