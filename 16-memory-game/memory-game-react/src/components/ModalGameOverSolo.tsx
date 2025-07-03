import style from "./ModalGameOverSolo.module.scss"
import {StatCount, StatTime} from "./Stat.tsx";
import ButtonPrimary from "./ButtonPrimary.tsx";
import ButtonSecondary from "./ButtonSecondary.tsx";

/**
 * {@link ModalGameOverSolo} is a modal that displays the game over screen for a solo game.
 * @param ref - a reference to the dialog element
 * @param timeElapsedInSeconds - the time elapsed in seconds
 * @param movesTaken - the number of moves taken by the player
 * @param onClickOnRestart - a callback function to be called when the player clicks on the restart button
 * @param onClickOnSetupNewGame - a callback function to be called when the player clicks on the setup new game button
 * @constructor
 */
function ModalGameOverSolo({ref, timeElapsedInSeconds, movesTaken, onClickOnRestart, onClickOnSetupNewGame}: {
    ref: any,
    timeElapsedInSeconds: number,
    movesTaken: number
    onClickOnRestart: () => void,
    onClickOnSetupNewGame: () => void
}) {
    return (
        <dialog ref={ref}>
            <div className={style.congrats}>
                <h2>You did it!</h2>
                <p>Game over! Here's how you got on...</p>
            </div>
            <div className={style.stats}>
                <StatTime label="Time Elapsed" timeInSeconds={timeElapsedInSeconds}/>
                <StatCount label="Moves taken" count={movesTaken} unit="Moves"/>
            </div>
            <div className={style.buttons}>
                <ButtonPrimary onClick={onClickOnRestart} type="submit" children="Restart"/>
                <ButtonSecondary onClick={onClickOnSetupNewGame}>Setup New Game</ButtonSecondary>
            </div>
        </dialog>
    )
}

export default ModalGameOverSolo