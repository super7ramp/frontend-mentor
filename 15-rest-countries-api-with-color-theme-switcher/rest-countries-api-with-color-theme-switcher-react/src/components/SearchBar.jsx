import style from './SearchBar.module.scss';

function SearchBar({value, onValueChange}) {
    const setValue = (event) => {
        console.log("SearchBar value changed:", event.target.value);
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