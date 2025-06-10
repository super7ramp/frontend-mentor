import style from './SearchBar.module.scss';

function SearchBar() {
    return (
        <input className={style.searchBar}
               type="search"
               placeholder="Search for a country..."/>
    )
}

export default SearchBar