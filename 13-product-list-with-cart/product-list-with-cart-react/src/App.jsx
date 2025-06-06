import './App.css'
import Desserts from "./components/Desserts.jsx";
import Dessert from "./components/Dessert.jsx";
import Cart from "./components/Cart.jsx";
import desserts from "./data/data.json";

function App() {

    return (
        <main className="app">
            <Desserts>
                {desserts.map(dessert =>
                    <Dessert
                        category={dessert.category}
                        name={dessert.name}
                        price={dessert.price}
                        image={dessert.image}
                    />
                )}
            </Desserts>
            <Cart items={desserts}/>
        </main>
    )
}

export default App
