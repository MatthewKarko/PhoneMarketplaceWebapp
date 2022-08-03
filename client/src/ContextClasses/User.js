import React from 'react';
import Cart from './Cart';

export class User {
    constructor(details) {
        this.id = details._id;
        this.email = details.email;
        this.firstname = details.firstname;
        this.lastname = details.lastname;
        this.password = details.password;
        this.cart = new Cart();
    }
}



const UserContext = React.createContext({ user: null, setUser: null });

export const UserProvider = UserContext.Provider;

export default UserContext;
