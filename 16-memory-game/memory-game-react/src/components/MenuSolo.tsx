import style from './MenuSolo.module.scss'

function MenuSolo({timeInSeconds, moves}: {timeInSeconds: number, moves: number}) {
    const formattedTime = formatTime(timeInSeconds)
    return (
        <div className={style.menuSolo}>
            <div className={style.stat}>
                <p className={style.key}>Time</p>
                <time className={style.value}>{formattedTime}</time>
            </div>
            <div className={style.stat}>
                <p className={style.key}>Moves</p>
                <p className={style.value}>{moves}</p>
            </div>
        </div>
    )
}

function formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

export default MenuSolo
