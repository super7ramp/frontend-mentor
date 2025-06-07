import orderConfirmedImg from "../assets/images/icon-order-confirmed.svg";
import style from "./OrderConfirmedModal.module.css";
import Order from "./Order.jsx";
import PrimaryButton from "./PrimaryButton.jsx";

/**
 * OrderConfirmedModal component displays a modal with the order confirmation details.
 *
 * @param items the items in the order
 * @param ref a reference to the dialog element, used to control its visibility
 * @param onStartNewOrder function to call when the "Start new order" button is clicked
 * @returns {JSX.Element}
 * @constructor
 */
function OrderConfirmedModal({items, ref, onStartNewOrder}) {
    return (
        <dialog className={style.dialog} ref={ref}>
            <ConfirmationHeader/>
            <ConfirmedOrder>
                <Order items={items} showThumbnail={true}/>
            </ConfirmedOrder>
            <StartNewOrderButton onClick={onStartNewOrder}/>
        </dialog>
    )
}

function ConfirmationHeader() {
    return (
        <header>
            <img src={orderConfirmedImg} alt="Order confirmed"/>
            <h2 className={`text-preset-1 ${style.confirmationTitle}`}>Order Confirmed</h2>
            <p className={`text-preset-3--regular ${style.confirmationSubtitle}`}>We hope you enjoy your food!</p>
        </header>
    )
}

function ConfirmedOrder({children}) {
    return (
        <div className={style.confirmedOrder}>
            {children}
        </div>
    )
}

function StartNewOrderButton({onClick}) {
    return (
        <PrimaryButton onClick={onClick}>
            <span className="text-preset-3">Start new order</span>
        </PrimaryButton>
    )
}

export default OrderConfirmedModal