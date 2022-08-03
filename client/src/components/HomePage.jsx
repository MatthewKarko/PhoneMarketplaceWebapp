import PhoneGrid from "./PhoneGrid";
import '../css/HomePage.css'
const HomePage = () => {
    return (
        <div className="home">
            <div className="Grid" id="best-sellers">
                <h2>Best Sellers</h2> 
                <PhoneGrid className="grid" source="/phone/bestSellers" />
            </div>
            <div className="Grid" id="sold-out-soon">
                <h2>Sold Out Soon</h2>
                <PhoneGrid className="grid" source="/phone/soldOutSoon" />
            </div>
        </div>
    )
}

export default HomePage;

