import style from "./Cart.module.css"
import emptyCart from "../assets/images/illustration-empty-cart.svg"
import carbonNeutralImg from "../assets/images/icon-carbon-neutral.svg";
import Order from "./Order.jsx";
import PrimaryButton from "./PrimaryButton.jsx";

function Cart({items, onDeleteItem, onConfirmOrder}) {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    return (
        <section className={style.container}>
            <h1 className={`${style.header} text-preset-2`}>Your Cart ({itemCount})</h1>
            {items.length === 0
                ? <EmptyCart/>
                : <NonEmptyCart items={items}
                                onDeleteItem={onDeleteItem}
                                onConfirmOrder={onConfirmOrder}/>}
        </section>
    );
}

function EmptyCart() {
    return (
        <div className={style.cartEmpty}>
            <img src={emptyCart} alt="Empty cart" className={style.placeholder}/>
            <p className="text-preset-4--bold">Your added items will appear here</p>
        </div>
    )
}

function NonEmptyCart({items, onDeleteItem, onConfirmOrder}) {
    return <>
        <Order items={items} onDeleteItem={onDeleteItem}/>
        <CarbonNeutralBanner/>
        <ConfirmOrderButton onClick={onConfirmOrder}/>
    </>
}

function CarbonNeutralBanner() {
    return (
        <div className={style.carbonNeutralBanner}>
            <img src={carbonNeutralImg} alt="Carbon neutral icon"/>
            <p className="text-preset-4">
                This is a <span className="text-preset-4--bold">carbon-neutral</span> delivery
            </p>
        </div>
    )
}

function ConfirmOrderButton({onClick}) {
    return (
        <PrimaryButton onClick={onClick}>
            <span className="text-preset-4--bold">Confirm order</span>
        </PrimaryButton>
    )
}

export default Cart