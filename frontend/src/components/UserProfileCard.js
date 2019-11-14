import React from "react";
import { Link } from "react-router-dom";
import { GracefulImage as ProfileImage } from "../styled/GracefulImage";

export const UserProfileCard = ({ username, profileImage, id }) => (
  <div className="d-flex align-items-center flex-column my-5 justify-content-center">
    <Link to={`/users/${id}`}>
      <ProfileImage
        src={profileImage}
        alt="Profile avatar"
        width="200px"
        height="200px"
        round={1}
      />
    </Link>
    <Link to={`/users/${id}`}>
      <h2>{`Hi, I am ${username}`}</h2>
    </Link>
  </div>
);
