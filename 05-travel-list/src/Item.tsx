import type { ItemType } from "./types";

interface ItemProps {
    item: ItemType
}

const Item: React.FC<ItemProps> = ({ item }) => {
    const { id, description, quantity, packed } = item;
    return (
        <li key={id} className="item">
            <span style={packed ? {textDecoration: "line-through"} : {}}>
                {quantity} {description}
            </span>
            <button style={{color : 'white'}}>X</button>
        </li>
    )
}

export default Item;