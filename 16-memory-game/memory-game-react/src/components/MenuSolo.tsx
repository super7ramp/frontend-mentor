import style from './MenuSolo.module.scss'

function MenuSolo({timeInSeconds, moves}: {timeInSeconds: number, moves: number}) {
    const formattedTime = formatTime(timeInSeconds)
    return (
        <div className={style.menuSolo}>
            <section>
                <h2>Time</h2>
                <time className={style.value}>{formattedTime}</time>
            </section>
            <section>
                <h2>Moves</h2>
                <p className={style.value}>{moves}</p>
            </section>
        </div>
    )
}

function formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

export default MenuSolo
