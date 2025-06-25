import type {PlayerStat} from "../models/PlayerStats.ts";
import MenuStatsSolo from "./MenuStatsSolo.tsx";
import MenuStatsMultiplayer from "./MenuStatsMultiplayer.tsx";

/**
 * MenuStats component displays the statistics of players in a memory game.
 *
 * In practice, component just forwards to either {@link MenuStatsSolo} or {@link MenuStatsMultiplayer}.
 * @param playerStats - An array of player statistics
 * @constructor
 */
function MenuStats({playerStats}: { playerStats: PlayerStat[] }) {
    const solo = playerStats.length === 1
    return (
        <>
            {
                solo
                    ? <MenuStatsSolo timeInSeconds={playerStats[0].timeInSeconds} moves={playerStats[0].moves}/>
                    : <MenuStatsMultiplayer playerStats={playerStats}/>
            }
        </>
    )
}

export default MenuStats