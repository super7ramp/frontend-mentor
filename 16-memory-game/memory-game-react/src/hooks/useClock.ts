import {useRef} from "react";

/**
 * Custom hook to manage a clock that ticks every second.
 * @param onTick - Callback function to be called every second when the clock ticks.
 */
function useClock(onTick: () => void) {
    let ref = useRef<number>(0);

    const start = () => {
        if (!ref.current) {
            console.log("Starting clock")
            const id = setInterval(onTick, 1000)
            console.log("started clock", id)
            ref.current = id
        }
    }

    const stop = () => {
        if (ref.current) {
            console.log("Stopping clock", ref.current)
            clearInterval(ref.current)
            ref.current = 0
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