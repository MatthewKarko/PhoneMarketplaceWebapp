import React, { useContext, useState , useEffect,  } from "react";
import UserContext from "../ContextClasses/User";
import { useHistory } from "react-router-dom";
import PhoneCard from "./PhoneCard";

import "../css/LoginSignup.css";

const ManageListing = () =>{
    const [phones, setPhones] = useState([]);
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();
    const [form , setForm] = useState({
        title : "",
        brand : "Apple",
        stock : "",
        price : "",
    });



    useEffect(() => {
        async function getItems(){
            const response = await fetch(`/phone/searchItemsBySellerID/${user.id}`);
            console.log(response)
            const data = await response.json();
            const itemsPromise = await JSON.parse(data);
            const newPhones = Object.values(itemsPromise.message);
            setPhones(newPhones);
        }
        getItems()
    }, [`/phone/searchItemsBySellerID/${user.id}`])


    async function addItem(){
        const response = await fetch (`/phone/addPhone/${form.title}/${form.brand}/${form.stock}/${user.id}/${form.price}`);
        console.log(response);
    }

    function handleChange(event){
        setForm({...form, [event.target.id]: event.target.value.trim()})
    }

    async function handleSubmit(event){
        event.preventDefault()
        addItem();
    }

    async function deleteItem(id){
        await fetch(`/phone/deleteItem/${id}`)
    }

    function mapPhones(){
        if (phones.length > 0) {
            return phones.map((phone, index) => {
                return (
                    <div id="phone-card">
                        <PhoneCard className="ownItem" phone={phone} />
                        <div>
                            <button className="delete-button"
                                onClick={() => {
                                    deleteItem(phone._id)
                                }}>
                                <p>Delete</p>
                            </button>
                        </div>
                    </div>
                )

            });
        }
    }

    return (
        <div className="loginSignupSection">
            <div>
            <form className="loginSignupForm" onSubmit={handleSubmit}>
                <div className="head">
                    <h2>Add a new Phone Listing</h2>
                </div>
                <div>
                    <label>Title</label>
                    <input
                        id="title"
                        className="textInput"
                        onChange={handleChange}
                        value={form.title}
                        type="text"
                        required
                    />
                </div>

                <div>
                    <label>Brand</label>
                    <input
                        id="brand"
                        className="textInput"
                        onChange={handleChange}
                        value={form.brand}
                        type="text"
                        required
                    />
                </div>

                <div>
                    <label>Stock</label>
                    <input
                        id="stock"
                        className="textInput"
                        onChange={handleChange}
                        value={form.stock}
                        type="text"
                        required
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        id="price"
                        className="textInput"
                        onChange={handleChange}
                        value={form.price}
                        type="text"
                        required
                    />
                </div>

                <div>
                <button type="submit" className="submitButton">
                    Add Phone
                </button>
                </div>
            </form>
            </div>
            <div id="my-listings">
                <h2>Your Listings</h2>
                <div className="itemsGrid">
                    {mapPhones()}
                </div>
            </div>

        </div>
    )





}

export default ManageListing;