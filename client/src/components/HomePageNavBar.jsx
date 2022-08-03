import React, { useEffect, useRef, useState, useContext } from 'react'
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import UserContext from '../ContextClasses/User';

import '../css/UserProfileNav.css'
const HomePageNavBar = () => {
    const { user, setUser } = useContext(UserContext);
    const [loggedIn, setLoggedIn] = useState(user !== null);
    useEffect(() => {
        if (loggedIn !== (user !== null)) {
            setLoggedIn(user !== null);
        }
    }, [user, loggedIn])

    const history = useHistory();
    const [currUrl, setCurrUrl] = useState(useRouteMatch().url);
    return(
        <div className='main-nav-bar'>
            <div id='user-profile'>
                    {!loggedIn ?
                        <ul id='user-menu'>
                         <li>
                            <Link to="/">
                                <p id="websiteName">PhoneSite</p>
                            </Link>
                        </li>   
                        <li><button
                            onClick={() => history.push('/login', { pathname: window.location.pathname })}
                            className="tab-button">
                            <p className="tab-text Login">Login</p>
                        </button></li> </ul>:
                        
                        <ul id='user-menu'>
                            <li>
                                <Link to="/">
                                    <p id="websiteName">PhoneSite</p>
                                </Link>
                            </li>   
                            <li><button
                                onClick={() => history.push('/checkout')}
                                className="tab-button">
                                <p id='tab-text Checkout'>Checkout</p>
                            </button></li>
                            <li><button
                                onClick={() => history.push('/user')}
                                className="tab-button">
                                    <p id='tab-text Profile'>View Profile</p>
                            </button></li>
                            <li><button
                                className="tab-button"
                                onClick={() => {
                                    if (window.confirm('Are you sure you want to logout?')) {
                                        setUser(null);
                                        history.push('/');
                                    }
                                }}>
                                <p id='tab-text Logout'>Logout</p>
                            </button></li>
                        </ul>
                    }
                

            </div>

        </div>
        
     

    )
}

export default HomePageNavBar;