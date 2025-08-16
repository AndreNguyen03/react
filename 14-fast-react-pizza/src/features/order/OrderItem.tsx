import type { CartItemType } from "../../types";
import { formatCurrency } from "../../utils";

type OrderItemProps = {
    item: CartItemType,
    isLoadingIngredients: boolean,
    ingredients: [string]
}

function OrderItem({ item, isLoadingIngredients, ingredients }: OrderItemProps) {
    const { quantity, name, totalPrice } = item;
    console.log(isLoadingIngredients, ingredients)
    return (
        <li>
            <div>
                <p>
                    <span>{quantity}&times;</span> {name}
                </p>
                <p>{formatCurrency(totalPrice)}</p>
            </div>
        </li>
    );
}

export { OrderItem };
