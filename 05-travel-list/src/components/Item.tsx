import type { ItemType } from "../types";

interface ItemProps {
    item: ItemType,
    onDelete: (id: number) => void,
    onToggle: (id: number) => void,
}

const Item: React.FC<ItemProps> = ({ item, onDelete, onToggle }) => {
    const { id, description, quantity, packed } = item;
    return (
        <li key={id} className="item">
            <input type="checkbox" checked={packed} onChange={() => onToggle(id)}/>
            <span style={packed ? { textDecoration: "line-through" } : {}}>
                {quantity} {description}
            </span>
            <button style={{ color: 'red' }} onClick={() => onDelete(id)}>X</button>
        </li>
    )
}

export default Item;