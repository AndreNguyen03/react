import { useSelector } from "react-redux";
import type { RootState } from "../../store";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {

  const balance = useSelector((state: RootState) => state.account.balance)

  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
