import style from "./Dessert.module.css"
import AddToCartButton from "./AddToCartButton.jsx";
import {useState} from "react";

/**
 * Dessert component represents a single dessert item with its details and an "Add to Cart" button.
 *
 * @param category the category of the dessert (e.g., "Ice Cream", "Cake")
 * @param name the name of the dessert (e.g., "Chocolate Cake")
 * @param price the price of the dessert (e.g., 4.99)
 * @param image the image object containing paths for mobile, tablet, and desktop views
 * @param initialQuantity the initial quantity of the dessert in the cart (default is 0)
 * @param onQuantityUpdated function to call when the quantity is updated; it receives the new quantity as an argument
 * @param initialState the initial selected state of the dessert; if true, the "Add to Cart" button is active
 * @returns {JSX.Element}
 * @constructor
 */
function Dessert({category, name, price, image, initialQuantity, onQuantityUpdated, initialState}) {
    const [selected, setSelected] = useState(initialState)

    return <article>
        <header className={style.imgAndButtonContainer}>
            <DessertPicture image={image} name={name} selected={selected}/>
            <AddToCartButton className={style.btn}
                             initialQuantity={initialQuantity}
                             onQuantityUpdated={onQuantityUpdated}
                             selectedState={selected}
                             onSelectedStateChange={(isSelected) => setSelected(isSelected)}
            />
        </header>
        <div className={style.detailsContainer}>
            <p className={`${style.category} text-preset-4`}>{category}</p>
            <h1 className={`${style.name} text-preset-3`}>{name}</h1>
            <p className={`${style.price} text-preset-3`}>{price.toFixed(2)}</p>
        </div>
    </article>
}

function DessertPicture({image, name, selected}) {
    const styleImg = selected ? `${style.img} ${style.imgSelected}` : style.img;
    return (
        <picture>
            <source srcSet={`/src/${image.tablet}`} media="(40.625rem <= width < 64rem)"/>
            <source srcSet={`/src/${image.desktop}`} media="(64rem <= width)"/>
            <img className={styleImg} src={`/src/${image.mobile}`} alt={name}/>
        </picture>
    )
}

export default Dessert