import style from "./ModalGameOverMultiplayer.module.scss";
import type {PlayerStat} from "../models/PlayerStats.ts";
import ButtonSecondary from "./ButtonSecondary.tsx";
import {StatCount} from "./Stat.tsx";

function ModalGameOverMultiplayer({ref, playerStats, onClickOnSetupNewGame}: {
    ref: any,
    playerStats: PlayerStat[],
    onClickOnSetupNewGame: () => void
}) {

    const ranking = playerStats.toSorted(byPairs)
    const isWinner = (player: PlayerStat) => player.pairs === ranking[0].pairs;
    const winners = ranking.filter(isWinner)

    return (
        <dialog ref={ref}>

            <div className={style.congrats}>
                <h2>{winners.length > 1 ? "It's a tie!" : `Player ${winners[0].id} wins!`}</h2>
                <p>Game over! Here are the results...</p>
            </div>

            <ul className={style.stats}>
                {
                    ranking.map(player =>
                        <PlayerRank key={player.id}
                                    player={player}
                                    isWinner={isWinner(player)}/>
                    )
                }
            </ul>

            <div className={style.buttons}>
                <ButtonSecondary onClick={onClickOnSetupNewGame}>Setup New Game</ButtonSecondary>
            </div>

        </dialog>
    )
}

function PlayerRank({player, isWinner}: { player: PlayerStat, isWinner: boolean }) {
    return (
        <li>
            <StatCount label={`Player ${player.id}${isWinner ? " (Winner!)" : ""}`}
                       count={player.pairs}
                       unit="Pairs"
                       variant={isWinner ? "best" : "default"}/>
        </li>
    )
}

function byPairs(a: PlayerStat, b: PlayerStat): number {
    return b.pairs - a.pairs
}

export default ModalGameOverMultiplayer