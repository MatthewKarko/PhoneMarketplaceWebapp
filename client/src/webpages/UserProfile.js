import { Redirect, Route, Router, Switch, useRouteMatch } from 'react-router-dom';
import UserProfileNav from '../components/UserProfileNav';
import EditProfile from '../components/EditProfile';
import ChangePassword from '../components/ChangePassword';
import ConfirmPassword from '../components/ConfirmPassword';
import ManageListing from '../components/ManageListing';
import ViewComments from '../components/ViewComments';

// https://www.agirl.codes/complete-guide-build-react-forms-with-usestate-hook
// https://retool.com/blog/building-a-react-navbar/



const UserProfile = () => {
    const currPath = useRouteMatch();
    return(
        <div>
           
                <UserProfileNav />
                <Switch>
                    <Route path={`${currPath.path}/managelistings`}>
                        <ManageListing />
                    </Route>
                    <Route path={`${currPath.path}/viewcomments`}>
                        <ViewComments />
                    </Route>
                    <Route path={`${currPath.path}/changepassword`}>
                        <ChangePassword />
                    </Route>
                    <Route path={`${currPath.path}/confirmpassword`}>
                        <ConfirmPassword />
                    </Route>
                    <Route path={currPath.path}>
                        <EditProfile />
                    </Route>
                </Switch>
            
            
        </div>  
    )
}


export default UserProfile