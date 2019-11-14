import React from "react";
// Components
import { Loader } from "../styled/Loader";

export const withLoader = WrappedComponent => props => {
  console.log(WrappedComponent);
  console.log(props);

  return (
    <>
      <WrappedComponent
        {...props}
        children={
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "70vh" }}
          >
            <Loader
              dark="#1d3f72"
              light="#5699d2"
              width="200px"
              height="200px"
              className="mx-auto"
            />
          </div>
        }
      />
    </>
  );
};
