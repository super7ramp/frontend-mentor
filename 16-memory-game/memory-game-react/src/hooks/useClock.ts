import {useState} from "react";

/**
 * Custom hook to manage a clock that ticks every second.
 * @param onTick - Callback function to be called every second when the clock ticks.
 */
function useClock(onTick: () => void) {
    const [clockId, setClockId] = useState<number | null>(null);

    const start = () => {
        if (!clockId) {
            const id = setInterval(onTick, 1000)
            setClockId(id)
        }
    }

    const stop = () => {
        if (clockId) {
            clearInterval(clockId)
            setClockId(null)
        }
    }

    return {
        start,
        stop,
    }
}

type Clock = ReturnType<typeof useClock>

export default useClock
export type {Clock}