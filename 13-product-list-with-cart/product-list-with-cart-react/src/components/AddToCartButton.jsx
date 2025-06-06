import style from "./AddToCartButton.module.css"
import addToCartImg from "../assets/images/icon-add-to-cart.svg"
import incrementImg from "../assets/images/icon-increment-quantity.svg"
import decrementImg from "../assets/images/icon-decrement-quantity.svg"
import {useState} from "react";

function AddToCartButton({className}) {
    const [count, setCount] = useState(0)
    const [active, setActive] = useState(false)

    return <>
        {active && <ActiveAddToCartButton className={className}
                                          currentCount={count}
                                          setCount={setCount}
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

function ActiveAddToCartButton({className, currentCount, setCount, setInactive}) {
    const increment = () => setCount((count) => count + 1)
    const decrement = () => setCount((count) => {
        if (count > 0) {
            return count - 1
        }
        setInactive()
        return 0
    })

    return (
        <button className={`${className} ${style.btn} ${style.btnActive} text-preset-4--bold`}>
            <img src={decrementImg} alt="Decrement" onClick={decrement}/>
            {currentCount}
            <img src={incrementImg} alt="Increment" onClick={increment}/>
        </button>
    )
}

export default AddToCartButton
