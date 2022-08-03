import React from "react";

class Cart{
    constructor() {
        this.items = []
    }

    getTotalCost() {
        let total = 0;
        this.items.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);
    }

    clear() {
        this.items = [];
    }
};



export default Cart;