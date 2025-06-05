import "./Cart.css"
import emptyCart from "../assets/images/illustration-empty-cart.svg"

function Cart({items}) {
    return (
        <section className="cart-container">
            <h1 className="cart__header text-preset-2">Your Cart (0)</h1>
            <EmptyCart/>
        </section>
    );
}

function EmptyCart() {
    return (
        <div className="cart--empty">
            <img src={emptyCart} alt="Empty cart" className="cart-placeholder"/>
            <p className="text-preset-4--bold">Your added items will appear here</p>
        </div>
    );
}

export default Cart