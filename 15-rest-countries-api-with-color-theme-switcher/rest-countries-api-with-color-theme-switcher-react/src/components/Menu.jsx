import style from "./Menu.module.scss"

function Menu() {
    return (
        <menu>
            <p className={style.title}>Where in the world</p>
            <button className={style.buttonToggleMode}></button>
        </menu>
    )
}

export default Menu