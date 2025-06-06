import style from "./Desserts.module.css"

function Desserts({children}) {
    return <section className={style.container}>
        <h1 className={`${style.title} text-preset-1`}>Desserts</h1>
        <div className={style.list}>
            {children}
        </div>
    </section>
}

export default Desserts