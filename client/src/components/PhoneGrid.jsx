import { useState, useEffect, cloneElement } from 'react';
import PhoneCard from './PhoneCard';
import '../css/PhoneGrid.css';

// https://www.youtube.com/watch?v=3M5iHWetiJA&ab_channel=QuentinWattTutorials
const PhoneGrid = ({source}) =>{
    const [items, setItems] = useState([])

    useEffect(() => {
        async function getItems(){
            const response = await fetch(source);
            console.log(response)
            const data = await response.json();
            const itemsPromise = await JSON.parse(data);
            const newItems = Object.values(itemsPromise.message);
            setItems(newItems);
        }
        getItems()
    }, [source])

    function mapItems(){
        console.log(items);
        if (items.length > 0) {
            return items.map((phone, index) => <PhoneCard phone={phone} key={index} />);
        }
    }

    return (
        <div className="phoneGrid">
            {mapItems()}
        </div>
    )
}

export default PhoneGrid;