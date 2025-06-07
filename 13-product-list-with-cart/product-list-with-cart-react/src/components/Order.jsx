import style from "./Order.module.css";
import removeItemImg from "../assets/images/icon-remove-item.svg"
import {patchUrl} from "../utils/urls.js";

/**
 * Order component displays a list of items with their details.
 *
 * @param items the items to display
 * @param onDeleteItem function to call when an item is deleted; If not provided, items are displayed without a delete
 * option.
 * @param showThumbnail whether to show item thumbnails
 * @returns {JSX.Element}
 * @constructor
 */
function Order({items, onDeleteItem, showThumbnail = false}) {
    const totalPrice = items.reduce((total, item) => total + (item.quantity * item.price), 0)

    return <div className={style.orderContainer}>
        <ul className={style.list}>
            {items.map(item => {
                return onDeleteItem
                    ? <Item key={item.name}
                            item={item}
                            onDeleteItem={() => onDeleteItem(item.name)}
                            showThumbnail={showThumbnail}/>
                    : <Item key={item.name}
                            item={item}
                            showThumbnail={showThumbnail}/>
            })}
        </ul>
        <hr className={style.separator}/>
        <OrderTotal totalPrice={totalPrice}/>
    </div>
}

function Item({item, onDeleteItem, showThumbnail}) {
    return (
        <li className={style.item}>
            <div className={style.thumbnailNameAndPriceContainer}>

                {showThumbnail && <Thumbnail item={item}/>}

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

            </div>

            {onDeleteItem
                ? <RemoveItemInput onDeleteItem={onDeleteItem}/>
                : <ItemTotalFixed item={item}/>}
        </li>
    )
}

function Thumbnail({item}) {
    return <img className={style.thumbnail} src={patchUrl(item.image.thumbnail)} alt={item.name}/>
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

function RemoveItemInput({onDeleteItem}) {
    return <input type="image"
                  src={removeItemImg}
                  alt="Remove item"
                  className={style.removeItemInput}
                  onClick={onDeleteItem}/>
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