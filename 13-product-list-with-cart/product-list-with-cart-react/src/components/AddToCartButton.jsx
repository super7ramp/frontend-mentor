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
            <SpinnerDown onClick={decrement}/>
            <QuantityInput value={currentQuantity} onInput={setQuantity}/>
            <SpinnerUp onClick={increment}/>
        </button>
    )
}

function QuantityInput({value, onInput}) {
    return (
        <input className={style.inputQuantity}
               type="number"
               min="0"
               value={`${value}`
                   /* Remove any leading zeros entered by the user  */
                   .replace(/^0+(?=\d)/, '')
               }
               onInput={(e) => {
                   if (e.target.validity.valid) {
                       onInput(parseInt(e.target.value))
                   } else {
                       onInput(0)
                   }
               }}
        />
    )
}

function SpinnerDown({onClick}) {
    return <Spinner img={decrementImg} onClick={onClick}/>
}

function SpinnerUp({onClick}) {
    return <Spinner img={incrementImg} onClick={onClick}/>
}

function Spinner({img, onClick}) {
    return (
        <input className={style.spinner}
               type="image"
               src={img}
               alt="Spinner icon"
               onClick={onClick}
        />
    )
}

export default AddToCartButton
