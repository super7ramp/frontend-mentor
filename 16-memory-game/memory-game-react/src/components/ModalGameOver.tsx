import style from "./ModalGameOver.module.scss"
import {StatCount, StatTime} from "./Stat.tsx";
import ButtonPrimary from "./ButtonPrimary.tsx";
import ButtonSecondary from "./ButtonSecondary.tsx";

function ModalGameOver({ref, timeElapsedInSeconds, movesTaken, onClickOnRestart, onClickOnSetupNewGame}: {
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
                <StatCount label="Moves taken" count={movesTaken}/>
            </div>
            <div className={style.buttons}>
                <ButtonPrimary onClick={onClickOnRestart} type="submit" children="Restart"/>
                <ButtonSecondary onClick={onClickOnSetupNewGame}>Setup New Game</ButtonSecondary>
            </div>
        </dialog>
    )
}

export default ModalGameOver