import style from "./PrimaryButton.module.css";

function PrimaryButton({children, onClick}) {
    return (
        <button className={style.primaryButton} onClick={onClick}>
            {children}
        </button>
    )
}

export default PrimaryButton