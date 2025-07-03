import {PlayerStats} from "../models/PlayerStats.ts";
import useClock from "./useClock.ts";

import {useState} from "react";

/**
 * {@link usePlayerStats} is a custom React hook that manages player statistics
 * @param playerCount - the number of players in the game
 */
function usePlayerStats(playerCount: number) {
    const [playerStats, setPlayerStats] = useState<PlayerStats>(() => PlayerStats.initial(playerCount))
    const clock = useClock(() => {
        setPlayerStats(stats => stats.onClockTick())
    })

    const recordPlayerMove = (id: number) => {
        setPlayerStats(stats => {
            if (stats.get(id).moves === 0) {
                clock.start()
            }
            return stats.recordPlayerMove(id)
        })
    }

    const recordPlayerFoundAPair = (id: number) => {
        setPlayerStats(stats => stats.recordPlayerFoundAPair(id))
    }

    const recordTurnFinished = (playerId: number, nextPlayerId: number) => {
        setPlayerStats(stats => stats.recordTurnFinished(playerId, nextPlayerId))
    }

    const recordGameFinished = () => {
        clock.stop()
    }

    const reset = () => {
        clock.stop()
        setPlayerStats(stats => stats.reset())
    }

    return {
        all: playerStats.all,
        recordPlayerMove,
        recordPlayerFoundAPair,
        recordTurnFinished,
        recordGameFinished,
        reset
    }
}

export default usePlayerStats
export type PlayerStatsHelper = ReturnType<typeof usePlayerStats>
