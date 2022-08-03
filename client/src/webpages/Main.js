import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import HomePage from '../components/HomePage';
import HomePageNavBar from '../components/HomePageNavBar';
import Phone from '../components/Phone';

const Main = () => {

    const match = useRouteMatch();
    return (
        <div>
            <HomePageNavBar />
            <Switch>
                <Route path={`${match.path}/item`}>
                    <Phone />
                </Route>
                <Route path={match.path}>
                    <HomePage />
                </Route>
            </Switch>
        </div>
        

    )
}

export default Main