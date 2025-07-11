import { useState } from "react";
import Button from "./Button"
import type { Friend } from "../types";

interface FormAddFriendProps {
    onAddFriend: (friend:Friend) => void;
}

const FormAddFriend: React.FC<FormAddFriendProps> = ({onAddFriend}) => {
    const [name, setName] = useState<string>("");
    const [image, setImage] = useState<string>("https://i.pravatar.cc/48");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !image) return;

        const id = Number(crypto.randomUUID())
        const newFriend = {
            name,
            image: `${image}?=${id}`,
            balance: 0,
            id
        };

        console.log(newFriend);
        onAddFriend(newFriend);

        setName("")
        setImage("https://i.pravatar.cc/48")
    }

    return (
        <form className="form-add-friend" onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            <label>| Friend name</label>
            <input
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />

            <label>| Image URL</label>
            <input
                type="text"
                value={image}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImage(e.target.value)}
            />

            <Button>
                Add
            </Button>
        </form>
    )
}

export default FormAddFriend;