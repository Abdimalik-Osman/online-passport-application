import React, { useContext, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

import { logoutUser } from "../store/actions";
import { LoginContext } from "../Components/Context/loginContext/LoginContext";
import Cover404 from "../pages/NotFound";

const AuthProtected = (props) => {
  const { User } = useContext(LoginContext);
  // console.log(User)
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();
  useEffect(() => {
    if (userProfile && !loading && token) {
      setAuthorization(token);
    } else if (!userProfile && loading && !token) {
      dispatch(logoutUser());
    }
  }, []);

  /*
    redirect is un-auth access protected routes via url
    */
  // console.log(User?.token);

  if (User?.status == "fail") {
    return (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }
  if (!User) {
    return (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};


const AccessRoute = ({ component: Component,allowedPages, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props?.location?.pathname?.substring(1));
        return (
          <>
            {" "}
             <Component {...props} />
             
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
