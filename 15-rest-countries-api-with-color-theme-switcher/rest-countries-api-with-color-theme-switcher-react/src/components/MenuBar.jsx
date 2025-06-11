import style from "./MenuBar.module.scss"

function MenuBar() {
    return (
        <menu>
            <p className={style.title}>Where in the world</p>
            <button className={style.buttonToggleMode}></button>
        </menu>
    )
}

export default MenuBar