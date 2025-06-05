import "./AddToCartButton.css"
import addToCartImg from "../assets/images/icon-add-to-cart.svg"

function AddToCartButton({className}) {
    return <button className={`${className} button--add-to-cart text-preset-4--bold`}>
        <img src={addToCartImg} alt="Add to cart icon"/>
        Add to cart
    </button>
}

export default AddToCartButton
