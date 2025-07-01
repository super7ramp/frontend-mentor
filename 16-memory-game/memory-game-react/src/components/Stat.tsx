import style from "./Stat.module.scss";
import type {ReactNode} from "react";

function StatCount({label, count, unit, direction = "row", variant = "default", big = false}: {
    label: string,
    count: number,
    unit?: string,
    direction?: "row" | "column",
    variant?: "current" | "best" | "default",
    big?: boolean
}) {
    return (
        <StatGeneric
            keyElement={
                <p className={styleOf("stat__key", variant, big)}>{label}</p>
            }
            valueElement={
                <p className={styleOf("stat__value", variant, big)}>{count}{unit && ` ${unit}`}</p>
            }
            direction={direction}
            variant={variant}
        />
    )
}

function StatTime({label, timeInSeconds, direction = "row", variant = "default", big = false}: {
    label: string,
    timeInSeconds: number,
    direction?: "row" | "column",
    variant?: "current" | "best" | "default",
    big?: boolean
}) {
    const formattedTime = formatTime(timeInSeconds)
    return (
        <StatGeneric
            keyElement={
                <p className={styleOf("stat__key", variant, big)}>{label}</p>
            }
            valueElement={
                <time className={styleOf("stat__value", variant, big)}>{formattedTime}</time>
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
    variant?: "current" | "best" | "default",
}) {
    return (
        <div className={styleOf("stat", variant) + (direction === "column" ? ` ${style["stat--column"]}` : "")}>
            <div className={style.arrowContainer}/>
            {keyElement}
            {valueElement}
        </div>
    )
}

function styleOf(baseClass: string, highlight: "current" | "best" | "default", big = false): string {
    let styles = style[`${baseClass}`]
    if (highlight != "default") {
        styles += ` ${style[`${baseClass}--${highlight}`]}`
    }
    if (big) {
        styles += ` ${style[`${baseClass}--big`]}`
    }
    return styles
}

export {StatCount, StatTime}