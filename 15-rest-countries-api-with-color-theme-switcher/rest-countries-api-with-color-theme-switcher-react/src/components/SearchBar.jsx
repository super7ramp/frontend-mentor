import style from './SearchBar.module.scss';

/**
 * SearchBar component to filter countries by name or capital name.
 *
 * @param value {string} - The current search value.
 * @param onValueChange {function} - Callback function to handle search value changes.
 * @returns {JSX.Element}
 * @constructor
 */
function SearchBar({value, onValueChange}) {
    const setValue = (event) => {
        onValueChange(event.target.value);
    }
    return (
        <input className={style.searchBar}
               type="search"
               placeholder="Search for a country..."
               value={value}
               onChange={setValue}/>
    )
}

export default SearchBar