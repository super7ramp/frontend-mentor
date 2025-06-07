import style from "./Dessert.module.css"
import AddToCartButton from "./AddToCartButton.jsx";
import {useState} from "react";

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