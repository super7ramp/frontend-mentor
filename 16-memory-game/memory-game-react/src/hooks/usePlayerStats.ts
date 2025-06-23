import {PlayerStats} from "../models/PlayerStats.ts";
import useClock from "./useClock.ts";

import {useState} from "react";

function usePlayerStats(playerCount: number) {
    const [playerStats, setPlayerStats] = useState<PlayerStats>(() => PlayerStats.initial(playerCount))
    const clock = useClock(() => {
        setPlayerStats(stats => stats.onClockTick())
    })

    const recordPlayerMove = (id: number) => {
        if (playerStats.get(id).moves === 0) {
            clock.start()
        }
        const updatedPlayerStats = playerStats.recordPlayerMove(id)
        setPlayerStats(updatedPlayerStats)
    }

    const recordGameFinished = () => {
        clock.stop()
    }

    const reset = () => {
        clock.stop()
        const updatedPlayerStats = playerStats.reset()
        setPlayerStats(updatedPlayerStats)
    }

    return {all: playerStats.all, recordPlayerMove, recordGameFinished, reset}
}

export default usePlayerStats
