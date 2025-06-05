import "./Desserts.css"

function Desserts({children}) {
    return <section className="desserts">
        <h1 className="desserts__title text-preset-1">Desserts</h1>
        <div className="desserts__list">
            {children}
        </div>
    </section>
}

export default Desserts