import style from "./MenuBar.module.scss"

/**
 * MenuBar component to display the title and a button for switching themes.
 *
 * @param onSwitchTheme {function} - Callback function to handle theme switching.
 * @returns {JSX.Element}
 * @constructor
 */
function MenuBar({onSwitchTheme}) {
    return (
        <menu>
            <p className={style.title}>Where in the world</p>
            <button className={style.buttonSwitchTheme} type="button" onClick={onSwitchTheme}/>
        </menu>
    )
}

export default MenuBar