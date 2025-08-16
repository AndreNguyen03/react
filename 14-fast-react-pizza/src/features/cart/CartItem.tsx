import type { CartItemType } from "../../types";
import { formatCurrency } from "../../utils";

function CartItem({ item }: { item: CartItemType }) {
    const { name, quantity, totalPrice } = item;

    return (
        <li>
            <p>
                {quantity}&times; {name}
            </p>
            <div>
                <p>{formatCurrency(totalPrice)}</p>
            </div>
        </li>
    );
}

export { CartItem };
