import type {PlayerStat} from "../models/PlayerStats.ts";
import ModalGameOverSolo from "./ModalGameOverSolo.tsx";
import ModalGameOverMultiplayer from "./ModalGameOverMultiplayer.tsx";

/**
 * {@link ModalGameOver} is a modal that displays the game over screen.
 * @param ref - a reference to the dialog element
 * @param playerStats - an array of player statistics, each containing the player's id, moves taken, time elapsed, and pairs found
 * @param onClickOnRestart - a callback function to be called when the player clicks on the restart button
 * @param onClickOnSetupNewGame - a callback function to be called when the player clicks on the setup new game button
 * @constructor
 */
function ModalGameOver({ref, playerStats, onClickOnRestart, onClickOnSetupNewGame}: {
    ref: any,
    playerStats: PlayerStat[],
    onClickOnRestart: () => void,
    onClickOnSetupNewGame: () => void
}) {
    return (
        <>
            {playerStats.length === 1

                ? <ModalGameOverSolo ref={ref}
                                     movesTaken={playerStats[0].moves}
                                     timeElapsedInSeconds={playerStats[0].timeInSeconds}
                                     onClickOnRestart={onClickOnRestart}
                                     onClickOnSetupNewGame={onClickOnSetupNewGame}/>

                : <ModalGameOverMultiplayer ref={ref}
                                            playerStats={playerStats}
                                            onClickOnSetupNewGame={onClickOnSetupNewGame}/>}
        </>
    )
}

export default ModalGameOver