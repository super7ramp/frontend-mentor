import style from "./Cart.module.css"
import emptyCart from "../assets/images/illustration-empty-cart.svg"

function Cart({items}) {
    return (
        <section className={style.container}>
            <h1 className={`${style.header} text-preset-2`}>Your Cart (0)</h1>
            <EmptyCart/>
        </section>
    );
}

function EmptyCart() {
    return (
        <div className={style.cartEmpty}>
            <img src={emptyCart} alt="Empty cart" className={style.placeholder}/>
            <p className="text-preset-4--bold">Your added items will appear here</p>
        </div>
    );
}

export default Cart