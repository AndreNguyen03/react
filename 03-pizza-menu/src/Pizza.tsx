interface PizzaProps {
    name: string;
    ingredient: string;
    photoName: string;
    price: number;
    soldOut?: boolean;
}

const Pizza = ({ name, ingredient, photoName, price,soldOut }: PizzaProps) => {

    // if(soldOut) {
    //    return null
    // }

    return (
        <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
            <img src={photoName} alt={photoName} />
            <div>
                <h3>{name}</h3>
                <p>{ingredient}</p>
                <span>{soldOut ? "SOLD OUT" : `${price}$`}</span>
            </div>
        </li>
    )
}

export default Pizza;