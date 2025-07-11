import { useState } from "react";
import type { ItemType } from "../types";

interface FormProps {
    onAddItems: (item: ItemType) => void
}

const Form: React.FC<FormProps> = ({ onAddItems }) => {

    const [description, setDescription] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!description) {
            alert("Please enter an item description");
            return;
        }

        const newItem = { description, quantity, packed: false, id: Date.now() };
        console.log(newItem);

        onAddItems(newItem);

        setDescription("");
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select value={quantity} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                return setQuantity(Number(e.target.value));
            }}>
                {Array.from({ length: 20 }, (_, i) => i + 1).map(num => {
                    return (
                        <option value={num} key={num}>{num}</option>
                    )
                })}
            </select>
            <input
                type="text"
                placeholder="Item...."
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    )
}

export default Form;