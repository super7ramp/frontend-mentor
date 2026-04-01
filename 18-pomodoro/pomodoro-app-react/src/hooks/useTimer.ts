import { useEffect, useState } from "react";

const useTimer = (duration: number) => {
  const [remaining, setRemaining] = useState(duration);
  const [paused, setPaused] = useState(true);
  const finished = remaining <= 0;
  const reset = () => setRemaining(duration);

  useEffect(() => {
    if (finished) {
      return;
    }
    const timerId = setInterval(() => {
      if (!paused) {
        setRemaining((n) => n - 1);
      }
    }, 1000);
    return () => clearInterval(timerId);
  }, [finished, paused]);

  return { remaining, paused, setPaused, finished, reset };
};

export default useTimer;
