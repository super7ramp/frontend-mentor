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
      setPaused(false);
    } else {
      setPaused(!paused);
    }
  };

  return (
    <div
      className="timer"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleClick();
          event.preventDefault();
        }
      }}
    >
      <div
        className="timer__arc"
        style={{ "--progress": progress } as React.CSSProperties}
      ></div>
      <div className="timer__content">
        <time
          className="timer__remaining"
          dateTime={formatDurationIso(minutes, seconds)}
        >
          {formatDuration(minutes, seconds)}
        </time>
        <p className="timer__button-text">{buttonText}</p>
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
  return `PT${minutes}M${seconds}S`;
};

export default Timer;
