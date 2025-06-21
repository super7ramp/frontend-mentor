import style from "./ButtonPrimary.module.scss"
import type {ReactNode} from "react";

function ButtonPrimary({type, onClick, children}: {
    type?: "button" | "submit" | "reset",
    onClick?: () => void,
    children: ReactNode
}) {
    return <button className={style.buttonPrimary} type={type} onClick={onClick}>{children}</button>
}

export default ButtonPrimary