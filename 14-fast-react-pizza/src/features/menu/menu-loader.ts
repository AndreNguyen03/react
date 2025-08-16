import type { LoaderFunction } from "react-router-dom"
import { getMenu } from "../../services"

export async function loader() : Promise<LoaderFunction> {
    const menu = await getMenu()
    return menu
}