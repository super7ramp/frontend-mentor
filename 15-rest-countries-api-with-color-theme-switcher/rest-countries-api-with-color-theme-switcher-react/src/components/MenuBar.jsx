import style from "./MenuBar.module.scss"

function MenuBar({onSwitchTheme}) {
    return (
        <menu>
            <p className={style.title}>Where in the world</p>
            <button className={style.buttonSwitchTheme} type="button" onClick={onSwitchTheme}/>
        </menu>
    )
}

export default MenuBar