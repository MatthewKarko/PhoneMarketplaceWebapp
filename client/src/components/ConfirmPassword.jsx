import { useContext, useState } from "react";
import { useHistory , useLocation } from "react-router-dom";
import UserContext , { User } from "../ContextClasses/User";
import CryptoJS from "crypto-js";
import "../css/LoginSignup.css";

// https://www.codegrepper.com/code-examples/javascript/how+to+pass+state+in+history.push
const ConfirmPassword = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [password, setPassword] = useState({
    currPassword: "",
  });
  const location = useLocation();
  const form = location.state;

  async function isCorrectCurrentPassword() {
    //currently hardcoded, need to change the ID to ${user.id}
    const response = await fetch(`/user/getPass/${user.id}`);

    try {
      const data = await response.json();
      const result = await JSON.parse(data);
      const dbPassword = result.message[0].password;
      return CryptoJS.MD5(password.currPassword).toString() === dbPassword;
    } catch (err) {
      console.log(err);
    }

    return false;
  }
  async function updateUserInfo(){    
    //currently hardcoded, need to change the ID to ${user.id}
    const response = await fetch(`/user/updateUserInfo/${user.id}/${form.firstname}/${form.lastname}/${form.email}`);
    console.log(response);
    try {
        const result = await response.json();
        console.log(result);
    } catch (err) {
        console.log(err);
    }
    setUser(
        new User({ 
            _id: user.id, 
            firstname: form.firstname, 
            lastname: form.lastname,
            email: form.email
        })
    );
    
}

  function handleChange(event) {
    setPassword({ ...form, [event.target.id]: event.target.value.trim() });
  }

 

  async function handleSubmit(event) {
    event.preventDefault();

    if (await isCorrectCurrentPassword()) {
        updateUserInfo();
        alert("User information successfully changed");
      history.push('/user')
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
      <p className="msg">Confirm your password:</p>
      <form className="loginSignupForm" onSubmit={handleSubmit}>
        <div>
          <label>Current Password: </label>
          <input
            class="passwordInput"
            onChange={handleChange}
            id="currPassword"
            type="password"
            value={password.currPassword}
          />
        </div>
        <div>
          <button className="submitButton">Confirm Profile Change</button>
        </div>
      </form>
    </div>
  );
};

export default ConfirmPassword;
