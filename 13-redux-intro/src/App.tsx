import CreateCustomer from "./features/customers/CreateCustomer.tsx";
import Customer from "./features/customers/Customer.tsx";
import AccountOperations from "./features/accounts/AccountOperations.tsx";
import BalanceDisplay from "./features/accounts/BalanceDisplay.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "./store.ts";

function App() {
	const customerFullName = useSelector((state: RootState) => state.customer.fullName)

	return (
		<div>
			<h1>🏦 The React-Redux Bank ⚛️</h1>
			{customerFullName === '' ? <CreateCustomer /> : (
				<>
					<Customer />
					<AccountOperations />
					<BalanceDisplay />
				</>
			)}

		</div>
	);
}

export default App;
