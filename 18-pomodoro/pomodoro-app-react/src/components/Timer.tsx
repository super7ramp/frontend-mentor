import useTimer from "../hooks/useTimer"

import './Timer.scss'

type TimerProps = {
    /** timer duration in seconds */
    duration: number
}

const Timer = ({ duration }: TimerProps) => {
    const { remaining, paused, setPaused, finished, reset } = useTimer(duration);
    const progress = (duration - remaining) / duration

    let buttonText;
    if (finished) {
        buttonText = "Restart";
    } else if (paused) {
        buttonText = "Resume";
    } else {
        buttonText = "Pause";
    }

    const handleClick = () => {
        if (finished) {
            reset();
            setPaused(false)
        } else {
            setPaused(!paused)
        }
    }

    return (
        <div
            className="timer"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    handleClick();
                    event.preventDefault()
                }
            }}>
            <div className="timer__arc" style={{ '--progress': progress }}></div>
            <div className="timer__content">
                <time className="timer__remaining">{remaining}</time>
                <p className="timer__button-text">{buttonText}</p>
            </div>
        </div>
    )
}

export default Timer;