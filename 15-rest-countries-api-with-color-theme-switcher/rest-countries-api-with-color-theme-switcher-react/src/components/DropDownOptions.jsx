import style from './DropDownOptions.module.scss';

function DropDownOptions() {
    return (
        <select className={style.dropDownOptions}>
            <option value="" disabled selected>Filter by Region...</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
        </select>
    )
}

export default DropDownOptions