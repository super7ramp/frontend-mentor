import useTimer from "../hooks/useTimer";

import "./Timer.scss";

type TimerProps = {
  /** timer duration in seconds */
  durationInSeconds: number;
};

const Timer = ({ durationInSeconds }: TimerProps) => {
  const { remaining, paused, setPaused, finished, reset } =
    useTimer(durationInSeconds);
  const progress = (durationInSeconds - remaining) / durationInSeconds;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  let buttonActionText;
  if (finished) {
    buttonActionText = "Restart";
  } else if (paused) {
    buttonActionText = "Resume";
  } else {
    buttonActionText = "Pause";
  }

  const handleClick = () => {
    if (finished) {
      reset();
      setPaused(false);
    } else {
      setPaused(!paused);
    }
  };

  return (
    <div className="timer">
      <div
        aria-describedby="timer-remaining"
        aria-label="Timer progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.floor(100 * progress)}
        className="timer__arc"
        role="progressbar"
        style={{ "--progress": progress } as React.CSSProperties}
      ></div>
      <div className="timer__content">
        <time
          // Announce update every quarter instead of every second, to avoid spamming screen readers
          aria-live={
            remaining % (durationInSeconds / 4) === 0 ? "polite" : "off"
          }
          id="timer-remaining"
          className="timer__remaining"
          dateTime={formatDurationIso(minutes, seconds)}
        >
          {formatDuration(minutes, seconds)}
        </time>
        <button className="timer__button" onClick={handleClick} type="button">
          {buttonActionText}
        </button>
      </div>
    </div>
  );
};

const formatDuration = (minutes: number, seconds: number) => {
  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = String(seconds).padStart(2, "0");
  return `${paddedMinutes}:${paddedSeconds}`;
};

const formatDurationIso = (minutes: number, seconds: number) => {
  return `PT0H${minutes}M${seconds}S`;
};

export default Timer;
