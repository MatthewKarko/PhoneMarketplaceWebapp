import { useState, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

import UserContext from "../ContextClasses/User";
import "../css/UserProfileNav.css";

const UserProfileNav = () => {
  const history = useHistory();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);
  const { currentPath, setCurrentPath } = useState(location.pathname);

  return (
    <>
      <div className="profNavBar">
        <div id="profNav">
          {/* <div id='userProfileTitle'>

                </div> */}

          <ul id="menubar">
            <li>
              <Link to="/">
                <p id="websiteName">Home</p>
              </Link>
            </li>
            <li>
              <button
                className="tab-button editProfile"
                onClick={() => {
                  history.push("/user");
                  setCurrentPath("/user");
                }}
              >
                <p className="tab-text editProfile">Edit Profile</p>
              </button>
            </li>
            <li>
              <button
                className="tab-button changePassword"
                onClick={() => {
                  history.push("/user/changepassword");
                  setCurrentPath("/user/changepassword");
                }}
              >
                <p className="tab-text changePassword">Change Password</p>
              </button>
            </li>
            <li>
              <button
                className="tab-button manageListings"
                onClick={() => {
                  history.push("/user/managelistings");
                  setCurrentPath("/user/managelistings");
                }}
              >
                <p className="tab-text manageListings">Manage Listings</p>
              </button>
            </li>
            <li>
              <button
                className="tab-button viewComments"
                onClick={() => {
                  history.push("/user/viewcomments");
                  setCurrentPath("/user/viewcomments");
                }}
              >
                <p className="tab-text viewComments">View Comments</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};


export default UserProfileNav
