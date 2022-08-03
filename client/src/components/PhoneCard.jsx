import "../css/PhoneCard.css";
import {useHistory } from "react-router-dom";

const PhoneCard = ({ phone }) => {
    const history = useHistory();
    return (
        <div className="phonecard" onClick={() =>  {
            history.push(`/homepage/item/${phone.title}`, { phone : phone })
        }}>
        
        <img className="cardImage" src={`/phone_images/${phone.brand}.jpeg`} />

        <div className="p-3">
            <h3 className="font-bold text-xl mb-3">{phone.brand}</h3>
            <div className="font-bold mb-3">$ {phone.price}</div>
            <div className="mb-3">
            {phone.title.length > 100
                ? `${phone.title.substring(0, 100)}...`
                : phone.title}
            </div>
        </div>
        </div>
    );
};

export default PhoneCard;
