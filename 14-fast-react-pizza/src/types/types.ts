type CartItemType = {
    pizzaId: number,
    name: string,
    quantity: number,
    unitPrice: number,
    totalPrice: number
}

type OrderType = {
    id: string,
    customer: string,
    phone: string,
    address: string,
    priority: boolean,
    estimatedDelivery: string,
    cart: CartItemType[],
    position: string,
    orderPrice: number,
    priorityPrice: number,
    status?: string,
}
type Pizza = {
    id: number,
    name: string,
    unitPrice: number,
    ingredients: [string],
    soldOut: boolean,
    imageUrl: string
}

type OrderData =  {
  address: string;
  cart: CartItemType[];
  customer: string;
  phone: string;
  priority: boolean;
}

type ErrorResponse = {
    data?: string,
    error?: {
        message?: string,
        stack?: string
    },
    internal?: boolean,
    status?: number,
    statusText?: string
}
export type { CartItemType, OrderType, Pizza, ErrorResponse, OrderData }