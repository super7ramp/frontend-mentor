import "./Dessert.css"
import AddToCartButton from "./AddToCartButton.jsx";

function Dessert({category, name, price, image}) {
    return <article>
        <header className="dessert__img-and-button">
            <img className="dessert__img" src={image} alt={name}/>
            <AddToCartButton className="dessert__button"/>
        </header>
        <div className="dessert__details">
            <p className="dessert__category text-preset-4">{category}</p>
            <h1 className="dessert__name text-preset-3">{name}</h1>
            <p className="dessert__price text-preset-3">{price}</p>
        </div>
    </article>
}

export default Dessert