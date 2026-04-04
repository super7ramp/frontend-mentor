import { useEffect, useState } from "react";

const useTimer = (durationInSeconds: number) => {
  const [remaining, setRemaining] = useState(durationInSeconds);
  const [paused, setPaused] = useState(true);
  const finished = remaining <= 0;
  const reset = () => setRemaining(durationInSeconds);

  useEffect(() => {
    if (!finished && !paused) {
      const timerId = setInterval(() => setRemaining((n) => n - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [finished, paused]);

  return { remaining, paused, setPaused, finished, reset };
};

export default useTimer;
