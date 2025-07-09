import "./index.css"
import Order from "./Order";

const Footer = () => {

    const hour = new Date().getHours();
    const openHour = 12;
    const closeHour = 22;

    const isOpen = hour >= openHour && hour <= closeHour;

    if (!isOpen) {
        return (
            <p>Sorry, we're closed. We're open from {openHour}:00 to {closeHour}:00.</p>
        )
    }

    return (
        <footer className="footer">
            {isOpen ? (
               <Order closeHour={closeHour} openHour={openHour}/>
            ) : (
                <p>Sorry, we're closed. We're open from {openHour}:00 to {closeHour}:00.</p>
            )
            }
        </footer>
    )
}

export default Footer;