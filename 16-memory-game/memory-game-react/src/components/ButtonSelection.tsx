import style from "./ButtonSelection.module.scss";

/**
 * {@link ButtonSelection} component is a radio input styled as a button.
 *
 * @param name the label of the input
 * @param groupName the name of the radio group to which this input belongs
 * @param selected indicates if this input is checked
 * @param setSelected function to call when the input is checked
 * @constructor
 */
function ButtonSelection({label, groupName, selected, setSelected}: {
    label: string;
    groupName: string;
    selected: boolean;
    setSelected: () => void
}) {
    const inputId = `button-${groupName}-${label}`;
    return (
        <div className={style.buttonSelection}>
            <input type="radio"
                   id={inputId}
                   radioGroup={groupName}
                   checked={selected}
                   onChange={setSelected}
                   required={true}/>
            <label htmlFor={inputId}>{label}</label>
        </div>
    )
}

export default ButtonSelection