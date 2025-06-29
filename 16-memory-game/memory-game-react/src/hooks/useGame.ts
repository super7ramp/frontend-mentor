import GameSettings from "../models/GameSettings.ts";
import {useEffect, useState} from "react";
import Game, {newGame} from "../models/Game.ts";
import usePlayerStats, {type PlayerStatsHelper} from "./usePlayerStats.ts";

function useGame(gameSettings: GameSettings) {
    const stats = usePlayerStats(gameSettings.players)
    const [timeoutScheduled, setTimeoutScheduled] = useState(false)
    const [game, setGame] = useState<Game>(() => newGame(gameSettings, newGameActions(setTimeoutScheduled, stats)))

    useEffect(() => {
        if (!timeoutScheduled) {
            return
        }
        const timerId = setTimeout(() => setGame(game.onTimeout()), 500)
        return () => {
            clearTimeout(timerId)
            setTimeoutScheduled(false)
        }
    }, [timeoutScheduled, game]);

    return {game, setGame, playerStats: stats.all}
}

function newGameActions(setTimeoutScheduled: (value: (((prevState: boolean) => boolean) | boolean)) => void, stats: PlayerStatsHelper) {
    return {
        scheduleTimeout: () => {
            setTimeoutScheduled(true)
        },

        recordPlayerMove: (id: number) => {
            console.log("Recording player move for player", id)
            stats.recordPlayerMove(id)
        },

        recordPlayerFoundAPair: (id: number) => {
            console.log("Recording player found a pair for player", id)
            stats.recordPlayerFoundAPair(id)
        },

        recordTurnFinished: (playerId: number, nextPlayerId: number) => {
            console.log("Recording turn finished for player", playerId, "next player", nextPlayerId)
            stats.recordTurnFinished(playerId, nextPlayerId)
        },

        recordGameFinished: () => {
            console.log("Recording game finished")
            stats.recordGameFinished()
        },

        resetStats: () => {
            stats.reset()
        }
    }
}


export default useGame