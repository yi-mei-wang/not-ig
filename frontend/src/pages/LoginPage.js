import React from "react";
import { UserForm } from "../components/UserForm";

export const LoginPage = props => (
  <div style={{ margin: "auto" }}>
    <UserForm {...props} />
  </div>
);
