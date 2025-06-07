import './App.css'
import Desserts from "./components/Desserts.jsx";
import Dessert from "./components/Dessert.jsx";
import Cart from "./components/Cart.jsx";
import desserts from "./data/data.json";
import {useRef, useState} from "react";
import OrderConfirmedModal from "./components/OrderConfirmedModal.jsx";

function App() {
    const [cartItems, setCartItems] = useState([])
    const modalRef = useRef(null)

    const updateCart = ({name, price, quantity, image}) => {
        console.log("Updating cart with item:", {name, price, quantity});
        if (quantity > 0) {
            putItem({name, price, quantity, image})
        } else {
            deleteItem(name)
        }
    }

    const putItem = ({name, price, quantity, image}) => {
        const itemIndex = cartItems.findIndex(item => item.name === name)
        if (itemIndex < 0) {
            const updatedItems = [...cartItems, {name, price, quantity, image}]
            setCartItems(updatedItems)
            console.log("Item added to cart:", {name, price, quantity});
            console.log("Current cart items:", updatedItems);
        } else {
            const updatedItems = [...cartItems]
            updatedItems[itemIndex].quantity = quantity
            setCartItems(updatedItems)
            console.log("Item quantity updated in cart:", {name, price, quantity});
            console.log("Current cart items:", updatedItems);
        }
    }

    const deleteItem = (itemName) => {
        const itemIndex = cartItems.findIndex(item => item.name === itemName)
        if (itemIndex >= 0) {
            const updatedItems = [...cartItems]
            updatedItems.splice(itemIndex, 1)
            setCartItems(updatedItems)
            console.log("Item removed from cart:", itemName);
            console.log("Current cart items:", updatedItems);
        }
    }

    const itemQuantity = (itemName) => {
        const item = cartItems.find(item => item.name === itemName);
        return item ? item.quantity : 0;
    }

    const showModal = () => {
        modalRef.current?.showModal()
    }

    const resetCartAndCloseModal = () => {
        setCartItems([]);
        modalRef.current?.close()
    }

    return (
        <main className="app">
            <Desserts>
                {desserts.map(dessert =>
                    <Dessert
                        key={dessert.name}
                        category={dessert.category}
                        name={dessert.name}
                        price={dessert.price}
                        image={dessert.image}
                        onQuantityUpdated={(newQuantity) => {
                            const updatedItem = {...dessert, quantity: newQuantity}
                            updateCart(updatedItem)
                        }}
                        initialQuantity={itemQuantity(dessert.name)}
                    />
                )}
            </Desserts>

            <Cart items={cartItems}
                  onDeleteItem={deleteItem}
                  onConfirmOrder={showModal}/>

            <OrderConfirmedModal items={cartItems}
                                 ref={modalRef}
                                 onStartNewOrder={resetCartAndCloseModal}/>
        </main>
    )
}

export default App
