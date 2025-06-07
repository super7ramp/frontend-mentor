import style from "./Desserts.module.css"

/**
 * Desserts component displays a section for desserts with a title and a list of dessert items.
 *
 * @param children the dessert items to display, typically {@link Dessert} components
 * @returns {JSX.Element}
 * @constructor
 */
function Desserts({children}) {
    return <section className={style.container}>
        <h1 className={`${style.title} text-preset-1`}>Desserts</h1>
        <div className={style.list}>
            {children}
        </div>
    </section>
}

export default Desserts