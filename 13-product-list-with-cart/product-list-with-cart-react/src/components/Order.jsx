import style from "./Order.module.css";
import removeItemImg from "../assets/images/icon-remove-item.svg"

/**
 * Order component displays a list of items with their details.
 *
 * @param items the items to display
 * @param onDeleteItem function to call when an item is deleted; If not provided, items are displayed without a delete
 * option.
 * @returns {JSX.Element}
 * @constructor
 */
function Order({items, onDeleteItem}) {
    const totalPrice = items.reduce((total, item) => total + (item.quantity * item.price), 0)

    return <div className={style.orderContainer}>
        <ul className={style.list}>
            {items.map(item => {
                return onDeleteItem
                    ? <Item key={item.name} item={item} onDeleteItem={() => onDeleteItem(item.name)}/>
                    : <Item key={item.name} item={item}/>
            })}
        </ul>
        <hr className={style.separator}/>
        <OrderTotal totalPrice={totalPrice}/>
    </div>
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
                    {onDeleteItem && <ItemTotalVarying item={item}/>}
                </div>
            </div>
            {onDeleteItem
                ? <img src={removeItemImg} alt="Remove item" onClick={onDeleteItem}/>
                : <ItemTotalFixed item={item}/>}
        </li>
    )
}

function ItemTotalVarying({item}) {
    return <ItemTotal className={`text-preset-4--bold ${style.total}`} item={item}/>
}

function ItemTotalFixed({item}) {
    return <ItemTotal className={`text-preset-3 ${style.totalFixed}`} item={item}/>
}

function ItemTotal({item, className}) {
    return (
        <p className={className}>
            ${(item.quantity * item.price).toFixed(2)}
        </p>
    )
}

function OrderTotal({totalPrice}) {
    return (
        <div className={style.orderTotal}>
            <p className="text-preset-4">Order total</p>
            <p className="text-preset-2">${totalPrice.toFixed(2)}</p>
        </div>
    )
}

export default Order