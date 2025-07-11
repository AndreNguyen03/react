import { useState } from "react";
import type { Friend } from "../types";
import Button from "./Button";

interface FormSplitBillProps {
    selectedFriend: Friend,
    onSplitBill: (value: number) => void
}

const FormSplitBill: React.FC<FormSplitBillProps> = ({ selectedFriend, onSplitBill }) => {

    const [bill, setBill] = useState<string | number>("");
    const [paidByUser, setPaidByUser] = useState<string | number>("");
    const [whoIsPaying, setWhoIsPaying] = useState<string>("user");

    const paidByFriend = bill ? Number(bill) - Number(paidByUser) : ''

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!bill || !paidByUser) return;

        onSplitBill(whoIsPaying === 'user' ? Number(paidByFriend) : Number(-paidByUser))
    }

    return (
        <form className="form-split-bill" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>| Bill value</label>
            <input type="text" value={bill} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBill(Number(e.target.value))} />

            <label>| Your expense</label>
            <input type="text" value={paidByUser} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPaidByUser(
                Number(e.target.value) > Number(bill) ? Number(paidByUser) : Number(e.target.value))} />

            <label>| {selectedFriend.name}'s expense</label>
            <input type="text" disabled value={paidByFriend} />

            <label >| Who is paying the bill</label>
            <select value={whoIsPaying} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWhoIsPaying(e.target.value)} >
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>
                Split bill
            </Button>
        </form>
    )
}

export default FormSplitBill;