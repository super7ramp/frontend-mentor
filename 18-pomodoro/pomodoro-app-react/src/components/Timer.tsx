import useTimer from "../hooks/useTimer"

import './Timer.scss'

type TimerProps = {
    /** timer duration in seconds */
    duration: number
}

const Timer = ({ duration }: TimerProps) => {
    const { remaining, paused, setPaused, finished, reset } = useTimer(duration);

    let buttonText;
    if (finished) {
        buttonText = "Restart";
    } else if (paused) {
        buttonText = "Resume";
    } else {
        buttonText = "Pause";
    }

    return (
        <div className="timer" >
            <time className="timer__remaining">{remaining}</time>
            <button className="timer__button" onClick={() => {
                if (finished) {
                    reset();
                    setPaused(false)
                } else {
                    setPaused(!paused)
                }
            }}>
                {buttonText}
            </button>
        </div>
    )
}

export default Timer;