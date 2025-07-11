import { useState } from "react";
import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";
import type { ItemType } from "../types";

const initialItems: ItemType[] = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
];

const App = () => {
    const [items, setItems] = useState<ItemType[]>(initialItems);



    const handleAddItems = (item: ItemType) => {
        setItems(currItems => {
            return [
                ...currItems,
                item
            ]
        })
    }

    const handleDeleteItem = (id: number) => {
        setItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    const handleToggleItem = (id: number) => {
        setItems(currItems => {
            return currItems.map(item => {
                return item.id === id ? { ...item, packed: !item.packed } : item
            })
        })
    }

    const handleDeleteAllItem = () => {
        const confirmed = window.confirm('Are you sure you want to delete all items?');
        if (confirmed) setItems([])
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems} />
            <PackingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onDeleleAllItem={handleDeleteAllItem} />
            <Stats items={items} />
        </div>
    )
}

export default App;