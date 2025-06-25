import GameSettings from "../models/GameSettings.ts";
import {useState} from "react";
import Game, {newGame} from "../models/Game.ts";
import usePlayerStats from "./usePlayerStats.ts";

function useGame(gameSettings: GameSettings) {
    const stats = usePlayerStats(gameSettings.players)
    const [game, setGame] = useState<Game>(() => newGame(gameSettings, {

        scheduleTimeout: () => {
            setTimeout(() => {
                setGame(g => g.onTimeout())
            }, 500)
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

    }))
    return {game, setGame, playerStats: stats.all}
}

export default useGame