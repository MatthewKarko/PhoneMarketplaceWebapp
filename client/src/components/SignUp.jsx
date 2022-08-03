import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext, { User } from "../ContextClasses/User";

import "../css/LoginSignup.css";

const SignUp = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState({});

  const handleChange = (event) => {
    let userTarget = event.target;
    userTarget.setCustomValidity("");
    setForm({ ...form, [userTarget.title]: userTarget.value.trim() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let createUser = `/user/addUser/${form.firstname}/${form.lastname}/${form.email}/${form.password}`;
    // console.log(form.email);
    const fetchUser = await fetch(createUser);
    const userId = await fetchUser.json();

    if (fetchUser.status === 500) {
      alert("Email is already used");
      console.log("Email is already used");
      return;
    }

    // const validate = () => {
    //   if (form.email.split("").filter(x => x === "@").length !== 1) {
    //     alert("Email should contain an @");
    //     console.log("Email should contain an @");
    //   }
    // }

    // validate();

    setUser(
      new User({
        _id: userId,
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
      })
    );
    alert("Signup successfully");
    console.log("Signup successfully");
    history.goBack();
  };

  return (
    <>
      <div class="loginSignupSection">
        <div class="head">
          <h1>Create your account</h1>
        </div>
        <form className="loginSignupForm" onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <input
              class="textInput"
              onChange={handleChange}
              title="firstname"
              type="text"
              required
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              class="textInput"
              onChange={handleChange}
              title="lastname"
              type="text"
              required
            />
          </div>
          <div>
            <label>Email Address</label>
            <input
              class="textInput"
              id="email"
              onChange={handleChange}
              title="email"
              type="email"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              class="passwordInput"
              id="passwordInput"
              onChange={handleChange}
              title="password"
              type="password"
              pattern="^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$"
              required
            />
          </div>
          <p>
            At least 8 characters, must includes a lowercase and an uppercase
          </p>
          <input class="submitButton" type="submit" value="Create account" />
          <button
            type="button"
            class="swapButton"
            onClick={() => {
              history.replace("/login");
            }}
          >
            Already have an account?
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
