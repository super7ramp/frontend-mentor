import {useState} from "react";

function useTimer() {
    const [timeInSeconds, setTimeInSeconds] = useState(0);
    const [timerId, setTimerId] = useState<number | null>(null);

    const startTimer = () => {
        if (!timerId) {
            const id = setInterval(() => setTimeInSeconds(s => s + 1), 1000)
            setTimerId(id)
        }
    }

    const stopTimer = () => {
        if (timerId) {
            clearInterval(timerId);
            setTimerId(null);
        }
    }

    const resetTimer = () => {
        stopTimer();
        setTimeInSeconds(0);
    }

    return {
        timeInSeconds,
        startTimer,
        stopTimer,
        resetTimer
    }
}

export default useTimer