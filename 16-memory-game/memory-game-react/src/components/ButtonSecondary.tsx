import style from "./ButtonSecondary.module.scss";
import type {ReactNode} from "react";

function ButtonSecondary({type, onClick, children}: {
    type?: "button" | "submit" | "reset",
    onClick?: () => void,
    children: ReactNode
}) {
    return <button className={style.buttonSecondary} type={type} onClick={onClick}>{children}</button>
}

export default ButtonSecondary