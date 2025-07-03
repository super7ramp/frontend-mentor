import style from "./MenuBar.module.scss"
import ButtonPrimary from "./ButtonPrimary.tsx";
import ButtonSecondary from "./ButtonSecondary.tsx";

import {useRef} from "react";
import {useNavigate} from "react-router";

/**
 * {@link MenuBar} is the game menu bar.
 *
 * @param onClickOnRestart action to perform when user clicks on the menu's "Restart game" button
 * @constructor
 */
function MenuBar({onClickOnRestart}: { onClickOnRestart: () => void }) {
    const modalRef = useRef<HTMLDialogElement>(null)
    const navigate = useNavigate()

    const showModal = () => {
        modalRef.current?.showModal()
    }

    const restart = () => {
        onClickOnRestart()
        modalRef.current?.close()
    }

    const goToPageNewGame = () => {
        navigate("/")
    }

    const resumeGame = () => {
        modalRef.current?.close()
    }

    return (
        <div className={style.menuBar}>
            <h1>memory</h1>
            <div className={style["container--mobile"]}>
                <ButtonPrimary onClick={showModal} type="button">Menu</ButtonPrimary>
                <dialog ref={modalRef}>
                    <ButtonPrimary onClick={restart} type="reset">Restart</ButtonPrimary>
                    <ButtonSecondary onClick={goToPageNewGame} type="button">New Game</ButtonSecondary>
                    <ButtonSecondary onClick={resumeGame} type="button">Resume Game</ButtonSecondary>
                </dialog>
            </div>
            <div className={style["container--tablet"]}>
                <div className={style.buttons}>
                    <ButtonPrimary onClick={restart} type="reset">Restart</ButtonPrimary>
                    <ButtonSecondary onClick={goToPageNewGame} type="button">New Game</ButtonSecondary>
                </div>
            </div>
        </div>
    )
}

export default MenuBar