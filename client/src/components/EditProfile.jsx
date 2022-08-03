import React, { useContext, useState } from "react";
import UserContext from "../ContextClasses/User";
import { useHistory } from "react-router-dom";
import "../css/LoginSignup.css";

// const { user, setUser } = useContext(UserContext);
// const history = useHistory();

// const [form, setForm] = useState({
//     firstname: user.firstname,
//     lastname: user.lastname,
//     email: user.email
// });

const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const [form, setForm] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email
});

async function checkEmail(){
    const currEmail = form.email;
    if(currEmail != user.email){
      const response = await fetch(`/user/checkEmailExists/${currEmail}`)
      console.log(response);
      try {
          const data = await response.json();
          const result = await JSON.parse(data);
          return result.message.hasOwnProperty('0');
      } catch (err) {
          console.log(err);
      }

    }
    
    
    return false;
}

function handleChange(event){
    event.target.setCustomValidity('');
    setForm({...form, [event.target.id]: event.target.value.trim()})
}

async function handleSubmit(event){
    event.preventDefault();
    if (await checkEmail()) {
        let email = document.getElementById('email');

        email.focus();
        email.setCustomValidity("Email already taken");
        email.reportValidity();
    } else{
        let isExecuted = window.confirm("Are you sure would like to update your information?");
        if(isExecuted){
            // const connURL = `/user/updateUserInfo/62832f371807974060ecdad0/${form.firstname}/${form.lastname}/${form.email}`;
            // console.log(connURL);
            history.push('/user/confirmPassword', form);
            // updateCurrentProfile();
        }
        
    }
}


  return (
    <div className="loginSignupSection">
      <div class="head">
        <h1>{`Hi ${user.firstname}`}</h1>
      </div>
      <p className="msg">Edit your details:</p>
      <form className="loginSignupForm" onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            id="firstname"
            className="textInput"
            onChange={handleChange}
            value={form.firstname}
            type="text"
            required
          />
        </div>

        <div>
          <label>Last Name</label>
          <input
            id="lastname"
            className="textInput"
            onChange={handleChange}
            value={form.lastname}
            type="text"
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            id="email"
            className="textInput"
            onChange={handleChange}
            value={form.email}
            title="email"
            type="email"
            required
          />
        </div>

        <div>
          <button type="submit" className="submitButton">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
