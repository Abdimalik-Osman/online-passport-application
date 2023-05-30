import React, { useEffect } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import {setAuthorization} from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../store/actions";


const AuthProtected = (props) => {
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();
  const history = useHistory()
  useEffect(() => {
    if (!userProfile ||  !loading || token) {
      // setAuthorization(token);
      history.push("/dashboard");
    }
    // } else if (!userProfile && loading && !token) {
    //   history.push("/dashboard");
    // }
  }, [token, userProfile, loading, dispatch]);

  /*
    redirect is un-auth access protected routes via url
    */

  if (!userProfile && loading && !token) {
    return (
      history.push("/dashboard")
      // <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
      // <Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };