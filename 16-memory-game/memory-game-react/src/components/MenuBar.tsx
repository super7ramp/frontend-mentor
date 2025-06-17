import style from "./MenuBar.module.scss"

function MenuBar() {
    return (
        <div className={style.menuBar}>
            <h1>memory</h1>
            <div className={style.buttons}>
                <button>Menu</button>
            </div>
        </div>
    )
}

export default MenuBar