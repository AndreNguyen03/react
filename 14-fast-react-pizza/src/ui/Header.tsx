import { Link } from "react-router-dom";
import { SearchOrder } from "../features/order";

function Header() {
    return (
        <header>
            <Link to={'/'}>
                Fast React Pizza Co.
            </Link>

            <SearchOrder />
        </header>
    )
}

export { Header }