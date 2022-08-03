import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../ContextClasses/User";
import CryptoJS from "crypto-js";
import "../css/LoginSignup.css";

const ChangePassword = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [form, setForm] = useState({
    currPassword: "",
    newPassword: "",
  });

  async function isCorrectCurrentPassword() {
    //currently hardcoded, need to change the ID to ${user.id}
    const response = await fetch(`/user/getPass/${user.id}`);

    try {
      const data = await response.json();
      const result = await JSON.parse(data);
      const dbPassword = result.message[0].password;
      return CryptoJS.MD5(form.currPassword).toString() === dbPassword;
    } catch (err) {
      console.log(err);
    }

    return false;
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.id]: event.target.value.trim() });
  }

  async function updatePassword() {
    //currently hardcoded, need to change the ID to ${user.id}
    await fetch(`/user/updatePassword/${user.id}/${form.newPassword}`);
    alert("Password successfully updated");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (await isCorrectCurrentPassword()) {
      updatePassword();
    } else {
      alert("Error, incorrect password was entered");
    }
  }

  return (
    <div className="loginSignupSection">
      {/* Hardcoded, need to change user to user.firstname */}
      <div class="head">
        <h1>{`Hi ${user.firstname}`}</h1>
      </div>
      <p className="msg">Change your password:</p>
      <form className="loginSignupForm" onSubmit={handleSubmit}>
        <div>
          <label>Current Password: </label>
          <input
            class="passwordInput"
            onChange={handleChange}
            id="currPassword"
            type="password"
            value={form.currPassword}
          />
        </div>

        <div className="inputDiv">
          <label>New Password: </label>
          <input
            class="passwordInput"
            id="newPassword"
            onChange={handleChange}
            value={form.newPassword}
            type="password"
            pattern="^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$"
            required
          />
          <p className="advice">
            Make sure it's at least 8 characters including a lowercase,uppercase
            letter and a unique character.
          </p>
        </div>
        <div>
          <button className="submitButton">Confirm Password Change</button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
