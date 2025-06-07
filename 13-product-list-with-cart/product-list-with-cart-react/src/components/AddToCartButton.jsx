import style from "./AddToCartButton.module.css"
import addToCartImg from "../assets/images/icon-add-to-cart.svg"
import {useState} from "react";

/**
 * AddToCartButton component displays a button to add items to the cart.
 *
 * @param className a custom class name to apply to the button
 * @param initialQuantity the initial quantity of the item to add to the cart
 * @param onQuantityUpdated function called when the quantity is updated; it receives the new quantity as an argument
 * @param selectedState a boolean indicating whether the item is currently selected (active state)
 * @param onSelectedStateChange function called when the selected state changes; it receives the new state as an argument
 * @returns {JSX.Element}
 * @constructor
 */
function AddToCartButton({className, initialQuantity, onQuantityUpdated, selectedState, onSelectedStateChange}) {
    const [quantity, setQuantity] = useState(initialQuantity)

    const setQuantityAndNotify = (newQuantity) => {
        setQuantity(newQuantity)
        onQuantityUpdated(newQuantity)
    }

    // Reset states if initial quantity prop has changed
    if (initialQuantity !== quantity) {
        setQuantity(initialQuantity)
        onSelectedStateChange(initialQuantity > 0)
    }

    return <>
        {selectedState && <ActiveAddToCartButton className={className}
                                                 currentQuantity={quantity}
                                                 setQuantity={setQuantityAndNotify}
                                                 setInactive={() => onSelectedStateChange(false)}/>}

        {!selectedState && <InactiveAddToCartButton className={className}
                                                    setSelected={() => {
                                                        setQuantityAndNotify(1)
                                                        onSelectedStateChange(true)
                                                    }}/>}
    </>
}

function InactiveAddToCartButton({className, setSelected}) {
    return (
        <button className={`${className} ${style.btn} ${style.btnInactive} text-preset-4--bold`}
                onClick={setSelected}>
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
    return <Spinner className={style.spinnerDown} onClick={onClick}/>
}

function SpinnerUp({onClick}) {
    return <Spinner className={style.spinnerUp} onClick={onClick}/>
}

function Spinner({className, onClick}) {
    return (
        <input className={style.spinner + " " + className}
               type="image"
               alt="Spinner icon"
               onClick={onClick}
        />
    )
}

export default AddToCartButton
