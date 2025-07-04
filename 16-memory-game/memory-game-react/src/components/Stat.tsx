import style from "./Stat.module.scss";
import type {ReactNode} from "react";

/**
 * {@link StatCount} component is used to display a count statistic.
 * @param label - the label for the statistic
 * @param count - the numeric value of the statistic
 * @param unit - an optional unit for the statistic (e.g., "points", "seconds")
 * @param direction - the layout direction of the statistic, either "row" or "column"
 * @param variant - the variant of the statistic, can be "current", "best", or "default"
 * @param big - a boolean indicating if the statistic should be displayed in a larger font size
 * @constructor
 */
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
                <p className={styleOf("stat__value", variant, big)}>
                    <span>{count}</span>
                    <span>{unit && ` ${unit}`}</span>
                </p>
            }
            direction={direction}
            variant={variant}
        />
    )
}

/**
 * {@link StatTime} component is used to display a time statistic.
 * @param label - the label for the statistic
 * @param timeInSeconds - the time value in seconds
 * @param direction - the layout direction of the statistic, either "row" or "column"
 * @param variant - the variant of the statistic, can be "current", "best", or "default"
 * @param big - a boolean indicating if the statistic should be displayed in a larger font size
 * @constructor
 */
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

/**
 * {@link StatGeneric} is a generic component for displaying statistics.
 * @param keyElement - the element representing the key of the statistic
 * @param valueElement - the element representing the value of the statistic
 * @param direction - the layout direction of the statistic, either "row" or "column"
 * @param variant - the variant of the statistic, can be "current", "best", or "default"
 * @constructor
 */
function StatGeneric({keyElement, valueElement, direction = "row", variant = "default"}: {
    keyElement: ReactNode,
    valueElement: ReactNode,
    direction?: "row" | "column",
    variant?: "current" | "best" | "default",
}) {
    return (
        <div className={styleOf("stat", variant) + (direction === "column" ? ` ${style["stat--column"]}` : "")}>
            <div className={style.arrowContainer}/>
            <div className={style.innerContainer}>
                {keyElement}
                {valueElement}
            </div>
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