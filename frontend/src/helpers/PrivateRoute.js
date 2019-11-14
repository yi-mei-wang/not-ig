import React from "react";
import { Redirect, Route } from "react-router-dom";
import { observer } from "mobx-react";

import useStores from "../hooks/useStores";

// A wrapper for <Route> that redirects to the login page if you're not yet authenticated.
const PrivateRoute = observer(({ render: Component, ...rest }) => {
  const {
    rootStore: {
      userStore: { currentUser, setCurrentUser }
    }
  } = useStores();

  let user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
});

export { PrivateRoute };
