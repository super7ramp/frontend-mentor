import style from "./ButtonPrimary.module.scss"
import type {ReactNode} from "react";

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