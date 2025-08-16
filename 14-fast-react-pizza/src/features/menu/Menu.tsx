import { useLoaderData } from "react-router-dom";
import type { Pizza } from "../../types";
import { MenuItem } from "./MenuItem";

function Menu() {
    const menu = useLoaderData()

    return (
        <>
            <h1>Menu</h1>
            <ul>
                {menu.map((pizza: Pizza) => {
                    return <MenuItem pizza={pizza} key={pizza.id} />
                })}
            </ul>
        </>
    )
}

export { Menu };
