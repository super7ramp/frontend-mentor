import './App.css'
import Desserts from "./components/Desserts.jsx";
import Dessert from "./components/Dessert.jsx";
import Cart from "./components/Cart.jsx";
import desserts from "./data/data.json";

function App() {

    return (
        <main className="app">
            <Desserts>
                <Dessert
                    category="Waffle with Berries"
                    name="Waffle"
                    price="6.50"
                    image="/src/assets/images/image-waffle-mobile.jpg"
                />

                <Dessert
                    name="Vanilla Bean Crème Brûlée"
                    category="Crème Brûlée"
                    price="7.00"
                    image="/src/assets/images/image-creme-brulee-mobile.jpg"
                />

                <Dessert
                    name="Macaron Mix of Five"
                    category="Macaron"
                    price="8.00"
                    image="/src/assets/images/image-macaron-mobile.jpg"
                />

                <Dessert
                    name="Classic Tiramisu"
                    category="Tiramisu"
                    price="5.50"
                    image="/src/assets/images/image-tiramisu-mobile.jpg"
                />

                <Dessert
                    name="Pistachio Baklava"
                    category="Baklava"
                    price="4.00"
                    image="/src/assets/images/image-baklava-mobile.jpg"
                />

                <Dessert
                    name="Lemon Meringue Pie"
                    category="Pie"
                    price="5.00"
                    image="/src/assets/images/image-meringue-mobile.jpg"
                />

                <Dessert
                    name="Red Velvet Cake"
                    category="Cake"
                    price="4.50"
                    image="/src/assets/images/image-cake-mobile.jpg"
                />

                <Dessert
                    name="Salted Caramel Brownie"
                    category="Brownie"
                    price="4.50"
                    image="/src/assets/images/image-brownie-mobile.jpg"
                />

                <Dessert
                    name="Vanilla Panna Cotta"
                    category="Panna Cotta"
                    price="6.50"
                    image="/src/assets/images/image-panna-cotta-mobile.jpg"
                />
            </Desserts>
            <Cart items={desserts}/>
        </main>
    )
}

export default App
