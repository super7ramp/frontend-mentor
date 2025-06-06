import style from "./Dessert.module.css"
import AddToCartButton from "./AddToCartButton.jsx";

function Dessert({category, name, price, image, updateCart}) {

    const onQuantityUpdated = (quantity) => {
        updateCart({name, price, quantity})
    }

    return <article>
        <header className={style.imgAndButtonContainer}>
            <img className={style.img} src={`/src/${image.mobile}`} alt={name}/>
            <AddToCartButton className={style.btn} onQuantityUpdated={onQuantityUpdated}/>
        </header>
        <div className={style.detailsContainer}>
            <p className={`${style.category} text-preset-4`}>{category}</p>
            <h1 className={`${style.name} text-preset-3`}>{name}</h1>
            <p className={`${style.price} text-preset-3`}>{price}</p>
        </div>
    </article>
}

export default Dessert