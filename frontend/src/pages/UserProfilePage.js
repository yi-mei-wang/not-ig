import React, { useState, useEffect } from "react";
// Components
import { UserProfileCard } from "../components/UserProfileCard";
import { UserImages } from "../components/UserImages";
// Helpers/constants
import { APIUrls } from "../constants/APIUrls";
import { getDataWithHeaders } from "../helpers/APICalls";
import { withLoader } from "../hocs/withLoader";

export const UserProfilePage = ({ match, setIsLoading }) => {
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const id = match.params.id;

  useEffect(() => {
    setIsLoading(true);
    let withHeaders = id === "me";

    let key = id === "me" ? "profile_picture" : "profileImage";

    let path = `${APIUrls.userInfo}${id}`;

    const getUserInfo = async () => {
      const resp = await getDataWithHeaders(path, withHeaders);
      setUsername(resp.data.username);
      setProfileImage(resp.data[key]);
      setIsLoading(false);
    };

    getUserInfo();
  }, [setIsLoading, id]);

  return (
    <>
      <UserProfileCard
        username={username}
        profileImage={profileImage}
        id={id}
      />
      <div className="d-flex justify-content-center">
        <UserImages id={id} />
      </div>
    </>
  );
};
