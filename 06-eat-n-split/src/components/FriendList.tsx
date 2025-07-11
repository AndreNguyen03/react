import type { Friend } from "../types";
import Friends from "./Friends";

interface FriendListProps {
    friends: Friend[],
    onSelection: (friend:Friend) => void;
    selectedFriend?: Friend
}

const FriendList: React.FC<FriendListProps> = ({friends,selectedFriend, onSelection}) => {
    return (
        <ul>
            {friends.map((friend) => {
                return (
                    <Friends friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend}/>
                )
            })}
        </ul>
    )
}

export default FriendList;