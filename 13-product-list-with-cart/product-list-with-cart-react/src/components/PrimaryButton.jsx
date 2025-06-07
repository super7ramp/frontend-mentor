import style from "./PrimaryButton.module.css";

/**
 * PrimaryButton component renders a button styled as a primary action button.
 *
 * @param children the content to display inside the button, typically text or icons
 * @param onClick function to call when the button is clicked
 * @returns {JSX.Element}
 * @constructor
 */
function PrimaryButton({children, onClick}) {
    return (
        <button className={style.primaryButton} onClick={onClick}>
            {children}
        </button>
    )
}

export default PrimaryButton