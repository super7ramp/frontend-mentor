import type {PlayerStat} from "../models/PlayerStats.ts";
import ModalGameOverSolo from "./ModalGameOverSolo.tsx";
import ModalGameOverMultiplayer from "./ModalGameOverMultiplayer.tsx";

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