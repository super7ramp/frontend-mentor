import style from "./AddToCartButton.module.css"
import addToCartImg from "../assets/images/icon-add-to-cart.svg"
import incrementImg from "../assets/images/icon-increment-quantity.svg"
import decrementImg from "../assets/images/icon-decrement-quantity.svg"
import {useState} from "react";

function AddToCartButton({className, onQuantityUpdated, initialQuantity}) {
    const [quantity, setQuantity] = useState(initialQuantity)
    const [active, setActive] = useState(initialQuantity > 0)

    const setQuantityAndNotify = (newQuantity) => {
        setQuantity(newQuantity)
        onQuantityUpdated(newQuantity)
    }

    // Reset states if initial quantity prop has changed
    if (initialQuantity !== quantity) {
        setQuantity(initialQuantity)
        setActive(initialQuantity > 0)
    }

    return <>
        {active && <ActiveAddToCartButton className={className}
                                          currentQuantity={quantity}
                                          setQuantity={setQuantityAndNotify}
                                          setInactive={() => setActive(false)}/>}

        {!active && <InactiveAddToCartButton className={className}
                                             setActive={() => setActive(true)}/>}
    </>
}

function InactiveAddToCartButton({className, setActive}) {
    return (
        <button className={`${className} ${style.btn} ${style.btnInactive} text-preset-4--bold`}
                onClick={setActive}>
            <img src={addToCartImg} alt="Add to cart icon"/>
            Add to cart
        </button>
    )
}

function ActiveAddToCartButton({className, currentQuantity, setQuantity, setInactive}) {
    const increment = () => setQuantity(currentQuantity + 1)
    const decrement = () => {
        if (currentQuantity > 0) {
            setQuantity(currentQuantity - 1)
            return
        }
        setInactive()
    }

    return (
        <button className={`${className} ${style.btn} ${style.btnActive} text-preset-4--bold`}>
            <img src={decrementImg} alt="Decrement" onClick={decrement}/>
            {currentQuantity}
            <img src={incrementImg} alt="Increment" onClick={increment}/>
        </button>
    )
}

export default AddToCartButton
