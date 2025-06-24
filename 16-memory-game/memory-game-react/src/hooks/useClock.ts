import {useState} from "react";

/**
 * Custom hook to manage a clock that ticks every second.
 * @param onTick - Callback function to be called every second when the clock ticks.
 */
function useClock(onTick: () => void) {
    const [clockId, setClockId] = useState<number | null>(null);

    const start = () => {
        if (!clockId) {
            console.log("Starting clock")
            const id = setInterval(onTick, 1000)
            console.log("started clock", id)
            setClockId(id)
        }
    }

    const stop = () => {
        if (clockId) {
            console.log("Stopping clock", clockId)
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