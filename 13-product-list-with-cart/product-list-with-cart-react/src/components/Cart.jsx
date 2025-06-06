import style from "./Cart.module.css"
import emptyCart from "../assets/images/illustration-empty-cart.svg"
import removeItemImg from "../assets/images/icon-remove-item.svg"
import carbonNeutralImg from "../assets/images/icon-carbon-neutral.svg";

function Cart({items, onDeleteItem}) {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    return (
        <section className={style.container}>
            <h1 className={`${style.header} text-preset-2`}>Your Cart ({itemCount})</h1>
            {items.length === 0
                ? <EmptyCart/>
                : <NonEmptyCart items={items} onDeleteItem={onDeleteItem}/>}
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

function NonEmptyCart({items, onDeleteItem}) {
    const totalPrice = items.reduce((total, item) => total + (item.quantity * item.price), 0)

    return <>
        <ItemList items={items} onDeleteItem={onDeleteItem}/>
        <OrderTotal totalPrice={totalPrice}/>
        <CarbonNeutralBanner/>
        <ConfirmOrderButton/>
    </>
}

function ItemList({items, onDeleteItem}) {
    return <ul className={style.list}>
        {items.map(item => <Item key={item.name} item={item} onDeleteItem={() => onDeleteItem(item.name)}/>)}
    </ul>;
}

function Item({item, onDeleteItem}) {
    return (
        <li className={style.item}>
            <div className={style.nameAndPriceContainer}>
                <p className="text-preset-4--bold">{item.name}</p>
                <div className={style.priceContainer}>
                    <p className={`text-preset-4--bold ${style.quantity}`}>
                        {item.quantity}x
                    </p>
                    <p className={`text-preset-4 ${style.price}`}>
                        @ ${item.price.toFixed(2)}
                    </p>
                    <p className={`text-preset-4--bold ${style.total}`}>
                        ${(item.quantity * item.price).toFixed(2)}
                    </p>
                </div>
            </div>
            <img src={removeItemImg} alt="Remove item" onClick={onDeleteItem}/>
        </li>
    )
}

function OrderTotal({totalPrice}) {
    return <div className={style.orderTotal}>
        <p className="text-preset-4">Order total</p>
        <p className="text-preset-2">${totalPrice.toFixed(2)}</p>
    </div>;
}

function CarbonNeutralBanner() {
    return <div className={style.carbonNeutralBanner}>
        <img src={carbonNeutralImg} alt="Carbon neutral icon"/>
        <p className="text-preset-4">
            This is a <span className="text-preset-4--bold">carbon-neutral</span> delivery
        </p>
    </div>;
}

function ConfirmOrderButton() {
    return (
        <button className={`${style.confirmOrderButton} text-preset-4--bold`}>
            Confirm order
        </button>
    );
}

export default Cart