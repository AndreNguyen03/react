import Pizza from "./Pizza";
import { pizzaData } from "./data.ts";
import type { PizzaType } from "./types.ts";

const Menu = () => {

    const numPizzas = pizzaData.length;

    return (
        <main className="menu">
            <h2>Our Menu</h2>
            {numPizzas > 0 ? (
                <>
                    <p>
                        Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious.
                    </p>

                    <ul className="pizzas">
                        {pizzaData.map((pizza: PizzaType) => {
                            return (
                                <Pizza
                                    key={pizza.name}
                                    name={pizza.name}
                                    ingredient={pizza.ingredients}
                                    photoName={pizza.photoName}
                                    price={pizza.price}
                                    soldOut={pizza.soldOut}
                                />
                            )
                        })}
                    </ul>
                </>
            ) : (
                <p>We're stll working on out menu. Please come back later</p>
            )}
        </main>
    )
}

export default Menu;