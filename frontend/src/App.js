import React, { useEffect } from "react";
import { withRouter, Switch, Route, Link } from "react-router-dom";
import { observer } from "mobx-react";
// Components
import { MyNavbar as Navbar } from "./components/Navbar";
import { AddButton } from "./styled/AddButton";
// Pages
import { Homepage } from "./pages/Homepage";
import { LoginPage } from "./pages/LoginPage";
import { LogoutPage } from "./pages/LogoutPage";
import UploadPage from "./pages/UploadPage";
import { UserProfilePage } from "./pages/UserProfilePage";
// Helpers
import { PrivateRoute } from "./helpers/PrivateRoute";
// Hooks
import useStores from "./hooks/useStores";
// Stylesheet
import "./App.css";

const App = () => {
  // const signal = axios.CancelToken.source();

  const {
    rootStore: {
      loadingStore: { setIsLoading },
      userStore: { currentUser, setCurrentUser }
    }
  } = useStores();

  useEffect(() => {
    // localStorage.getItem("jwt");
    let user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, [setCurrentUser]);

  return (
    <>
      <Navbar currentUser={currentUser} />
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}

      <Switch>
        <PrivateRoute exact path="/" render={Homepage} />

        <Route
          key="login"
          exact
          path="/login"
          component={props => <LoginPage {...props} />}
        />
        <Route
          key="signup"
          exact
          path="/signup"
          component={props => <LoginPage {...props} />}
        />
        <PrivateRoute
          exact
          path="/logout"
          render={props => (
            <LogoutPage {...props} setCurrentUser={setCurrentUser} />
          )}
        />
        <PrivateRoute
          exact
          path="/users/:id"
          render={props => (
            <UserProfilePage {...props} setIsLoading={setIsLoading} />
          )}
        />
        <PrivateRoute path="/upload" render={UploadPage} />
      </Switch>

      {currentUser && (
        <Link to="/upload">
          <AddButton />
        </Link>
      )}
    </>
  );
};

export default observer(withRouter(App));
