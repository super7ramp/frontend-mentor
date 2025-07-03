import style from "./ButtonSecondary.module.scss";
import type {ReactNode} from "react";

/**
 * {@link ButtonSecondary} is a secondary button component.
 * @param type - the type of the button, can be "button", "submit" or "reset"
 * @param onClick - a callback function to be called when the button is clicked
 * @param children - the content of the button, can be text or any React node
 * @constructor
 */
function ButtonSecondary({type, onClick, children}: {
    type?: "button" | "submit" | "reset",
    onClick?: () => void,
    children: ReactNode
}) {
    return <button className={style.buttonSecondary} type={type} onClick={onClick}>{children}</button>
}

export default ButtonSecondary