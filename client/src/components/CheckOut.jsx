import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import "../css/LoginSignup.css";
import UserContext, { User } from "../ContextClasses/User";
const CheckOut = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [totalCost, setTotalCost] = useState(user.cart.getTotalCost());
  const [items, setItems] = useState(user.cart.items);

  const handleSubmit = () => {
    let isSubmitted = window.confirm("Confirm your payment?");
    if (isSubmitted) {
        confirmPayment();
        console.log("Your payment is submitted")
        history.push('/');
    }
  };

  const confirmPayment = async () => {
    const testPhoneURL = await fetch('Phone/getPhones');
    try {
        const result = await testPhoneURL.json();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
  }

  const clearAll = () => {
    let isExecuted = window.confirm("Are you sure?");
    if (isExecuted) {
        console.log("Your cart is clear.")
        user.cart.items = [];
    }
  };

  return (
    <div class="loginSignupSection">
      <div>
        <button
          className="submitButton"
          onClick={() => {
            history.goBack();
          }}
        >
          Back
        </button>
      </div>
      <form className="loginSignupForm" onSubmit={handleSubmit}>
        <div class="head">
          <h1>Checkout</h1>
        </div>
        <div>
          <p className="msg">${items.title}</p>
        </div>
        <div>
          <p className="msg">Total cost: ${totalCost}</p>
        </div>
        <div>
          <input
            class="submitButton"
            type="submit"
            value="Confirm the payment"
          />
          <button type="button" class="swapButton" onClick={clearAll}>
            clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOut;
