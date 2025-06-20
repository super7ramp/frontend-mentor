import style from "./Stat.module.scss";
import type {ReactNode} from "react";

function StatCount({label, count}: { label: string, count: number }) {
    return <StatGeneric keyElement={<p className={style.key}>{label}</p>}
                        valueElement={<p className={style.value}>{count}</p>}/>
}

function StatTime({label, timeInSeconds}: { label: string, timeInSeconds: number }) {
    const formattedTime = formatTime(timeInSeconds)
    return <StatGeneric keyElement={<p className={style.key}>{label}</p>}
                        valueElement={<time className={style.value}>{formattedTime}</time>}/>
}

function formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function StatGeneric({keyElement, valueElement}: { keyElement: ReactNode, valueElement: ReactNode }) {
    return (
        <div className={style.stat}>
            {keyElement}
            {valueElement}
        </div>
    )
}

export {StatCount, StatTime}