import style from "./ButtonStart.module.scss"

/**
 * ButtonStart component is a button to start the game.
 * @constructor
 */
function ButtonStart() {
    return <button className={style.buttonStart} type="submit">Start Game</button>
}

export default ButtonStart