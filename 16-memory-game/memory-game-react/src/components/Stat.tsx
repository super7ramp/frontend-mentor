import style from "./Stat.module.scss";
import type {ReactNode} from "react";

function StatCount({label, count, unit, direction = "row", variant = "default"}: {
    label: string,
    count: number,
    unit?: string,
    direction?: "row" | "column",
    variant?: "current" | "best" | "default"
}) {
    return (
        <StatGeneric
            keyElement={
                <p className={styleOf("stat__key", variant)}>{label}</p>
            }
            valueElement={
                <p className={styleOf("stat__value", variant)}>{count}{unit && ` ${unit}`}</p>
            }
            direction={direction}
            variant={variant}
        />
    )
}

function StatTime({label, timeInSeconds, direction = "row", variant = "default"}: {
    label: string,
    timeInSeconds: number,
    direction?: "row" | "column",
    variant?: "current" | "best" | "default"
}) {
    const formattedTime = formatTime(timeInSeconds)
    return (
        <StatGeneric
            keyElement={
                <p className={styleOf("stat__key", variant)}>{label}</p>
            }
            valueElement={
                <time className={styleOf("stat__value", variant)}>{formattedTime}</time>
            }
            direction={direction}
            variant={variant}
        />
    )
}

function formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function StatGeneric({keyElement, valueElement, direction = "row", variant = "default"}: {
    keyElement: ReactNode,
    valueElement: ReactNode,
    direction?: "row" | "column",
    variant?: "current" | "best" | "default"
}) {
    return (
        <div className={styleOf("stat", variant) + (direction === "column" ? ` ${style["stat--column"]}` : "")}>
            <div className={style.arrowContainer}/>
            {keyElement}
            {valueElement}
        </div>
    )
}

function styleOf(baseClass: string, highlight: "current" | "best" | "default"): string {
    let styles = style[`${baseClass}`]
    if (highlight != "default") {
        styles += ` ${style[`${baseClass}--${highlight}`]}`
    }
    return styles
}

export {StatCount, StatTime}