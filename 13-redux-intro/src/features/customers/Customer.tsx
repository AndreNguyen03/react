import { useAppSelector } from "../../store";

function Customer() {
  const customerFullName = useAppSelector(state => state.customer.fullName)

  return <h2>👋 Welcome, {customerFullName}</h2>;
}

export default Customer;
