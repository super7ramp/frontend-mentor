import style from "./NumberField.module.css";

/**
 * NumberField component for inputting numeric values with optional prefix and suffix.
 * @param className additional CSS class for styling
 * @param label the label for the input field
 * @param value the current value of the input field
 * @param setValue function to update the value of the input field
 * @param prefix optional prefix to display before the input value (e.g., currency symbol)
 * @param suffix optional suffix to display after the input value (e.g., currency symbol)
 * @param min optional minimum value for the input field
 * @param max optional maximum value for the input field
 * @returns {JSX.Element}
 * @constructor
 */
function NumberField({className, label, value, setValue, prefix, suffix, min, max}) {
    const onInput = (event) => setValue(event.target.value)
    const id = label.replace(/\s+/g, '-').toLowerCase();
    return (
        <div className={className + " " + style.numberField}>
            <label htmlFor={id} className="text-preset-4">{label}</label>
            <div className={style.numberFieldPrefixInputSuffix}>
                {prefix && <p className={`text-preset-3 ${style.numberFieldUnit}`}>{prefix}</p>}
                <input type="number"
                       required={true}
                       min={min || Number.MIN_VALUE}
                       max={max || Number.MAX_VALUE}
                       step="any"
                       id={id}
                       value={value}
                       className="text-preset-3"
                       onInput={onInput}/>
                {suffix && <p className={`text-preset-3 ${style.numberFieldUnit}`}>{suffix}</p>}
            </div>
        </div>
    )
}

export default NumberField