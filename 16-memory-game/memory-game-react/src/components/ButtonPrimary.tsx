import style from "./ButtonPrimary.module.scss"
import type {ReactNode} from "react";

/**
 * {@link ButtonPrimary} is a primary button component.
 * @param type - the type of the button, can be "button", "submit" or "reset"
 * @param onClick - a callback function to be called when the button is clicked
 * @param children - the content of the button, can be text or any React node
 * @param big - a boolean indicating if the button should be big, defaults to false
 * @constructor
 */
function ButtonPrimary({type, onClick, children, big = false}: {
    type?: "button" | "submit" | "reset",
    onClick?: () => void,
    children: ReactNode,
    big?: boolean
}) {
    let styles = style.buttonPrimary
    if (big) {
        styles += ` ${style["buttonPrimary--big"]}`
    }
    return (
        <button className={styles}
                type={type}
                onClick={onClick}>
            {children}
        </button>
    )
}

export default ButtonPrimary