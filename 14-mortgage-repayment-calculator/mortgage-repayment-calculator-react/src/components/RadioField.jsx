import style from "./RadioField.module.css";

/**
 * RadioField component for selecting one option from a group of radio buttons.
 * @param label the label for the radio button
 * @param groupName the name of the radio button group (to ensure only one can be selected at a time)
 * @param checked indicates if this radio button is currently selected
 * @param setChecked function to update the checked state of the radio button
 * @returns {JSX.Element}
 * @constructor
 */
function RadioField({label, groupName, checked, setChecked}) {
    const id = label.replace(/\s+/g, '-').toLowerCase();
    return (
        <div className={style.radioField}>
            <input type="radio"
                   id={id}
                   name={groupName}
                   required={true}
                   checked={checked}
                   onChange={setChecked}/>
            <label htmlFor={id} className="text-preset-3">{label}</label>
        </div>
    )
}

export default RadioField