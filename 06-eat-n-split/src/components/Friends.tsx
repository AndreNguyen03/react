import type { Friend } from "../types"
import Button from "./Button";

interface FriendsProps {
    friend: Friend,
    onSelection: (friend: Friend) => void
    selectedFriend?: Friend
}

const Friends: React.FC<FriendsProps> = ({ friend ,selectedFriend,onSelection}) => {

    const isSelected = selectedFriend?.id === friend.id;

    return (
        <li>
            <img src={friend.image} alt={friend.image} />
            <h3>{friend.name}</h3>

            {friend.balance < 0 && (
                <p className="red">
                    You owe {friend.name} {Math.abs(friend.balance)}$
                </p>
            )}
            {friend.balance > 0 && (
                <p className="green">
                    {friend.name} owes you {Math.abs(friend.balance)}$
                </p>
            )}
            {friend.balance === 0 && (
                <p >
                    You and {friend.name} are even
                </p>
            )}

            <Button onClick={() => onSelection(friend)}>
                {isSelected ? 'Close' : 'Select'}
            </Button>
        </li>
    )
}

export default Friends;