import style from './Card.module.scss'

function Card({country}) {

    return (
        <article className={style.card}>
            <img className={style.flag} src={country.flag} alt={`Flag of ${country.name}`}/>
            <div className={style.nameAndSummary}>
                <h2>{country.name}</h2>
                <div className={style.summary}>
                    <p>
                        <span className={style.key}>Population</span>: {country.population}
                    </p>
                    <p>
                        <span className={style.key}>Region</span>: {country.region}
                    </p>
                    <p>
                        <span className={style.key}>Capital{country.capitals.length > 1 ? "s" : ""}</span>
                        : {country.capitals.join(", ")}
                    </p>
                </div>
            </div>
        </article>
    )

}

export default Card