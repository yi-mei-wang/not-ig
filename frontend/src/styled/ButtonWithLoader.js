import React, { useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { Loader as Icon } from "./Loader";

export function ButtonWithLoader({ isLoading, children, ...props }) {
  /* showLoader is used to stay in the "isLoading state" a bit longer to avoid loading flashes
   if the loading state is too short. */
  const [showLoader, setShowLoader] = useState(false);

  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1)
    }
  }));

  const classes = useStyles();

  useEffect(() => {
    isLoading ? setShowLoader(true) : setShowLoader(false);
  }, [isLoading, showLoader]);

  /* Capture the dimensions of the button before the loading happens
  so it doesn’t change size.
  These hooks can be put in a separate file. */
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect().width) {
      setWidth(ref.current.getBoundingClientRect().width);
    }
    if (ref.current && ref.current.getBoundingClientRect().height) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [children]);

  return (
    <Button
      {...props}
      ref={ref}
      disabled={props.disabled}
      variant="contained"
      color="secondary"
      className={classes.button}
      style={
        showLoader
          ? {
              width: `${width}px`,
              height: `${height}px`
            }
          : {}
      }
    >
      {/* {children} */}
      {showLoader ? (
        <Icon dark="#dede" light="#fff" width="25px" height="25px">
          send
        </Icon>
      ) : (
        children
      )}
    </Button>
  );
}
