import { useState } from "react";
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from "react-router-dom";


// https://www.digitalocean.com/community/tutorials/how-to-handle-routing-in-react-apps-with-react-router
import Login from "./webpages/Login";
import Signup from "./webpages/Signup";
import Main from "./webpages/Main";
import Checkout from "./webpages/Checkout"
import UserProfile from "./webpages/UserProfile";
import { UserProvider, User } from "./ContextClasses/User";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <UserProvider value={{ user, setUser }}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/homepage">
              <Main />
            </Route>
            <Route path="/checkout">
              <Checkout />
            </Route>
            <Route path="/user">
              <UserProfile />
            </Route>
            <Route path="/">
              <Redirect to="/homepage" />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
