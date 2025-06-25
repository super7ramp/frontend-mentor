import style from "./Stat.module.scss";
import type {ReactNode} from "react";

function StatCount({label, count, unit, direction = "row"}: {
    label: string,
    count: number,
    unit?: string,
    direction?: "row" | "column"
}) {
    return <StatGeneric keyElement={<p className={style.stat__key}>{label}</p>}
                        valueElement={<p className={style.stat__value}>{count}{unit && ` ${unit}`}</p>}
                        direction={direction}/>
}

function StatTime({label, timeInSeconds, direction = "row"}: {
    label: string,
    timeInSeconds: number,
    direction?: "row" | "column"
}) {
    const formattedTime = formatTime(timeInSeconds)
    return <StatGeneric keyElement={<p className={style.stat__key}>{label}</p>}
                        valueElement={<time className={style.stat__value}>{formattedTime}</time>}
                        direction={direction}/>
}

function formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function StatGeneric({keyElement, valueElement, direction = "row"}: {
    keyElement: ReactNode,
    valueElement: ReactNode,
    direction?: "row" | "column"
}) {
    return (
        <div className={`${style.stat} ${direction === "column" && style["stat--column"]}`}>
            {keyElement}
            {valueElement}
        </div>
    )
}

export {StatCount, StatTime}