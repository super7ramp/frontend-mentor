import style from "./ModalGameOver.module.scss"

function ModalGameOver({ref, timeElapsedInSeconds, movesTaken, onClickOnRestart, onClickOnSetupNewGame}: {
    ref: any,
    timeElapsedInSeconds: number,
    movesTaken: number
    onClickOnRestart: () => void,
    onClickOnSetupNewGame: () => void
}) {
    const formattedTime = formatTime(timeElapsedInSeconds)
    return (
        <dialog ref={ref}>
            <div className={style.congrats}>
                <h2>You did it!</h2>
                <p>Game over! Here's how you got on...</p>
            </div>
            {/* TODO create a stat component, deduplicate with MenuSolo */}
            <div className={style.stats}>
                <div className={style.stat}>
                    <p className={style.key}>Time Elapsed</p>
                    <time className={style.value}>{formattedTime}</time>
                </div>
                <div className={style.stat}>
                    <p className={style.key}>Moves taken</p>
                    <p className={style.value}>{movesTaken}</p>
                </div>
            </div>
            <div className={style.buttons}>
                <button className="button--primary" onClick={onClickOnRestart} type="submit">Restart</button>
                <button className="button--secondary" onClick={onClickOnSetupNewGame}>Setup New Game</button>
            </div>
        </dialog>
    )
}

function formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

export default ModalGameOver