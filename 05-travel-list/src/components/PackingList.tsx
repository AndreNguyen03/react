import { useState } from "react";
import Item from "./Item";
import type { ItemType } from "../types";

interface PackingListProps {
    items: ItemType[],
    onDeleteItem: (id: number) => void,
    onToggleItem: (id: number) => void,
    onDeleleAllItem: () => void
}

const PackingList: React.FC<PackingListProps> = ({ items, onDeleteItem, onToggleItem, onDeleleAllItem }) => {

    const [sortBy, setSortBy] = useState<string>("input");

    let sortedItems: ItemType[] = [];

    if (sortBy === "input") sortedItems = items;
    if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item: ItemType) => {
                    return (
                        <Item item={item} key={item.id} onDelete={onDeleteItem} onToggle={onToggleItem} />
                    )
                })}
            </ul>

            <div className="actions">
                <select value={sortBy} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)}>
                    <option value="input">Sort by input order</option>
                    <option value="description">Sort by description</option>
                    <option value="packed">Sort by packed status</option>
                </select>
                <button onClick={onDeleleAllItem}>Clear list</button>
            </div>
        </div>
    )
}

export default PackingList;