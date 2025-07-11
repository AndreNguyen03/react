import { useState } from "react";
import Button from "./components/Button";
import FormAddFriend from "./components/FormAddFriend";
import FormSplitBill from "./components/FormSplitBill";
import FriendList from "./components/FriendList";
import type { Friend } from "./types";

const initialFriends: Friend[] = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const App = () => {

  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = useState<Friend | undefined>(undefined);


  const handleShowAddFriend = () => {
    setShowAddFriend(show => !show)
  }

  const handleAddFriend = (friend: Friend) => {
    setFriends(currFriend =>
      [...currFriend, friend]
    )
    setShowAddFriend(false);
  }

  const handleSelection = (friend: Friend) => {
    setSelectedFriend(selected => selected?.id === friend.id ? undefined : friend);
    setShowAddFriend(false);
  }

  const handleSplitBill = (value: number) => {
    if (!selectedFriend) return;
    setFriends(friends =>
      friends.map(friend => {
        if (friend.id === selectedFriend.id)
          return { ...friend, balance: friend.balance + value }
        else
          return friend
      })
    );

    setSelectedFriend(undefined);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends} onSelection={handleSelection} selectedFriend={selectedFriend} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? `Close` : `Add friend`}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />}
    </div>
  )
}

export default App;
