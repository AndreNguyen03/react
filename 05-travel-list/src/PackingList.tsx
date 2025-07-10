import Item from "./Item";
import type { ItemType } from "./types";

const initialItems: ItemType[] = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
];

const PackingList = () => {
    return (
        <div className="list">
            <ul>
                {initialItems.map(item => {
                    return (
                        <Item item={item}  key={item.id}/>
                    )
                })}
            </ul>
        </div>
    )
}

export default PackingList;