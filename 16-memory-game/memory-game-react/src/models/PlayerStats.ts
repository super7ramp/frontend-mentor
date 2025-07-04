/**
 * {@link PlayerStat} represents the statistics of a player in a memory game.
 */
type PlayerStat = {
    readonly id: number,
    readonly isCurrent: boolean,
    readonly moves: number,
    readonly pairs: number,
    readonly timeInSeconds: number,
}

/**
 * {@link PlayerStats} is a collection of {@link PlayerStat} objects, representing the statistics of all players.
 *
 * Class is immutable, all methods return a new instance with the updated statistics.
 */
class PlayerStats {
    readonly all: PlayerStat[]

    constructor(stats: PlayerStat[]) {
        this.all = stats
    }

    static initial(playerCount: number): PlayerStats {
        const playerStats = Array(playerCount)
        for (let i = 0; i < playerCount; i++) {
            playerStats[i] = {
                id: i + 1,
                isCurrent: i === 0,
                moves: 0,
                pairs: 0,
                timeInSeconds: 0,
            }
        }
        return new PlayerStats(playerStats)
    }

    get(id: number): PlayerStat {
        return this.all[id - 1]
    }

    recordPlayerMove(id: number) {
        const updatedPlayerStats = this.all.map(stat => {
            if (stat.id !== id) {
                return stat
            }
            return {
                ...stat,
                moves: stat.moves + 1,
            }
        })
        console.log("Updated player stats after move:", updatedPlayerStats)
        return new PlayerStats(updatedPlayerStats)
    }

    recordPlayerFoundAPair(id: number) {
        const updatedPlayerStats = this.all.map(stat => {
            if (stat.id !== id) {
                return stat
            }
            return {
                ...stat,
                pairs: stat.pairs + 1,
            }
        })
        console.log("Updated player stats after found a pair:", updatedPlayerStats)
        return new PlayerStats(updatedPlayerStats)
    }

    recordTurnFinished(playerId: number, nextPlayerId: number) {
        const updatedStats = this.all.map(stat => {
            if (stat.id === nextPlayerId) {
                return {
                    ...stat,
                    isCurrent: true,
                }
            }
            if (stat.id === playerId) {
                return {
                    ...stat,
                    isCurrent: false,
                }
            }
            return stat
        })
        console.log("Updated player stats after turn finished:", updatedStats)
        return new PlayerStats(updatedStats)
    }

    onClockTick() {
        const updatedStats = this.all.map(stat => {
            if (!stat.isCurrent) {
                return stat
            }
            return {
                ...stat,
                timeInSeconds: stat.timeInSeconds + 1,
            }
        })
        return new PlayerStats(updatedStats)
    }

    reset() {
        const updatedStats = this.all.map(stat => {
            return {
                ...stat,
                moves: 0,
                pairs: 0,
                timeInSeconds: 0,
            }
        })
        console.log("Reset player stats:", updatedStats)
        return new PlayerStats(updatedStats)
    }
}

export type {PlayerStat}

export {PlayerStats}