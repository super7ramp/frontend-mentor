import './App.css'
import Desserts from "./components/Desserts.jsx";
import Dessert from "./components/Dessert.jsx";
import Cart from "./components/Cart.jsx";
import desserts from "./data/data.json";
import {useState} from "react";

function App() {
    const [cartItems, setCartItems] = useState([])

    const updateCart = ({name, price, quantity}) => {
        console.log("Updating cart with item:", {name, price, quantity});
        const itemIndex = cartItems.findIndex(item => item.name === name)
        if (itemIndex < 0) {
            if (quantity > 0) {
                const updatedItems = [...cartItems, {name, price, quantity}]
                setCartItems(updatedItems)
                console.log("Item added to cart:", {name, price, quantity});
                console.log("Current cart items:", updatedItems);
            }
        } else {
            if (quantity === 0) {
                const updatedItems = [...cartItems]
                updatedItems.splice(itemIndex, 1)
                setCartItems(updatedItems)
                console.log("Item removed from cart:", {name, price, quantity});
                console.log("Current cart items:", updatedItems);
            } else {
                const updatedItems = [...cartItems]
                updatedItems[itemIndex].quantity = quantity
                setCartItems(updatedItems)
                console.log("Item quantity updated in cart:", {name, price, quantity});
                console.log("Current cart items:", updatedItems);
            }
        }
    }

    return (
        <main className="app">
            <Desserts>
                {desserts.map(dessert =>
                    <Dessert
                        category={dessert.category}
                        name={dessert.name}
                        price={dessert.price}
                        image={dessert.image}
                        updateCart={updateCart}
                    />
                )}
            </Desserts>
            <Cart items={cartItems}/>
        </main>
    )
}

export default App
