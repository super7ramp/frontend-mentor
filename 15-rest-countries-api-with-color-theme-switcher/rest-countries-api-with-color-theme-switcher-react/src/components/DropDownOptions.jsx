import style from './DropDownOptions.module.scss';

/**
 * DropDownOptions component to filter countries by region.
 *
 * @param selected {string} - The currently selected region.
 * @param onSelectionChange {function} - Callback function to handle selection changes.
 * @returns {JSX.Element}
 * @constructor
 */
function DropDownOptions({selected, onSelectionChange}) {
    const setSelected = (event) => {
        const value = event.target.value;
        onSelectionChange(value);
    }
    return (
        <select className={style.dropDownOptions} value={selected} onChange={setSelected}>
            <option value="">Filter by Region...</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
        </select>
    )
}

export default DropDownOptions