import type { ItemType } from "../types";

interface StatsProps {
    items: ItemType[]
}

const Stats: React.FC<StatsProps> = ({ items }) => {

    if(!items.length) {
        return (
            <p className="stats">
                <em>Start adding some items to your packing list</em>
            </p>
        )
    }

    const numItems = items.length;
    const alreadyPackedItems = items.reduce((acc, item) => {
        return item.packed ? acc + 1 : acc
    }, 0)
    const percentItemPacked = Math.round((alreadyPackedItems / numItems) * 100);

    return (
        <footer className="stats">
            <em>
                {
                    percentItemPacked === 100
                        ? 'You got everything! Ready to go ! '
                        : `You have ${numItems} items on your list, and you already packed ${alreadyPackedItems} (${percentItemPacked}%)`
                }
            </em>
        </footer>

    )
}

export default Stats;