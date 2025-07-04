import {useEffect, useRef} from "react";

/**
 * {@link useClock} is a custom hool to manage a clock that ticks every second.
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

    // Ensure the clock is stopped when the component unmounts
    useEffect(() => stop, []);

    return {
        start,
        stop,
    }
}

type Clock = ReturnType<typeof useClock>

export default useClock
export type {Clock}