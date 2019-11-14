import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// Components
import { ButtonWithLoader } from "../styled/ButtonWithLoader";
// Hooks
import useStores from "../hooks/useStores";
// Helpers/constants
import { postUserData } from "../helpers/APICalls";
import { APIUrls } from "../constants/APIUrls";

export const UserForm = ({ history, match }) => {
  const key = match.url.replace("/", "");
  const APIPath = APIUrls[key];

  const {
    rootStore: { userStore }
  } = useStores();

  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const [userInputs, setUserInputs] = useState({
    username: "",
    password: "",
    email: ""
  });

  const [errors, setErrors] = useState(false);

  const handleChange = name => e => {
    setUserInputs({ ...userInputs, [name]: e.target.value });
  };

  const handleError = name => {
    setErrors({ ...errors, [name]: true });
  };

  const postData = async () => {
    // validate user input
    try {
      const { auth_token, user } = await postUserData(APIPath, userInputs);
      // TODO: GET JWT FROM STATE

      localStorage.setItem("jwt", auth_token);
      localStorage.setItem("currentUser", JSON.stringify(user));

      // userStore.setCurrentUser(user);
      userStore.setCurrentUser(user);

      history.push({
        pathname: "/"
      });
    } catch (err) {
      console.log(err);
      setIsButtonLoading(false);
      handleError("password");
    }
  };

  const useStyles = makeStyles(theme => ({
    input: {
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  return (
    <div
      className="d-flex flex-column w-50 mx-auto my-3"
      style={{ border: "1px solid #eee", padding: "10px" }}
    >
      <TextField
        className={classes.input}
        label="Name"
        value={userInputs.username}
        onChange={handleChange("username")}
        margin="normal"
      />

      <TextField
        error={Boolean(errors.password)}
        className={classes.input}
        label="Password"
        type="password"
        autoComplete="current-password"
        margin="normal"
        onChange={handleChange("password")}
        value={userInputs.password}
      />

      {key === "signup" && (
        <TextField
          className={classes.input}
          label="Email"
          type="email"
          value={userInputs.email}
          onChange={handleChange("email")}
          margin="normal"
        />
      )}

      <div className="mx-auto">
        <ButtonWithLoader
          isLoading={isButtonLoading}
          onClick={() => {
            setIsButtonLoading(true);
            postData();
          }}
          disabled={
            !userInputs
              ? true
              : (!userInputs.username || !userInputs.password) && true
          }
          className="m-auto"
        >
          {key === "login" ? "Log In" : "Sign Up"}
        </ButtonWithLoader>
      </div>
    </div>
  );
};
