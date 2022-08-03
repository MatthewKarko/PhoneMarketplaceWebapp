import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext, { User } from "../ContextClasses/User";

import "../css/LoginSignup.css";

// https://www.codehim.com/collections/login-page-in-html-with-css-code/

const LogIn = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState({
    email: '',
    password: ''
});

  const handleChange = (event) => {
    let userTarget = event.target;
    setForm({
      ...form,
      [userTarget.title]: userTarget.value.trim(),
    });

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userInformation = `user/checkLogin/${form.email}/${form.password}`;
    const fetchUser = await fetch(userInformation);
    const userData = await fetchUser.json();
    const result = await JSON.parse(userData);
    console.log(result);
    if (Object.keys(result.message).length === 0) {
      alert("Wrong username or password");
      console.log("Wrong username or password");
    } else {
      setUser(new User(result.message[0]));
      // console.log(user.email);
      // console.log(user.firstname);
      alert("Login successfully");
      history.push('/');
    }
  };

  return (
    <>
      <div class="loginSignupSection">
        <div class="head">
          <h1>Login</h1>
        </div>
        <p className="msg">Welcome back</p>
        <form className="loginSignupForm" onSubmit={handleSubmit}>
          <div>
            <label>Email address</label>
            <input
              type="text"
              class="textInput"
              title="email"
              onChange={handleChange}
              value={form.email}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              class="passwordInput"
              title="password"
              onChange={handleChange}
              id="password"
              value={form.password}
            />
          </div>
          <input class="submitButton" type="submit" value="Login" />
          <button
            type="button"
            class="swapButton"
            onClick={() => {
              history.replace("/signup");
            }}
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default LogIn;
