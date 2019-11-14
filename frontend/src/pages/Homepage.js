import React, { useEffect } from "react";
import { observer } from "mobx-react";
// Hooks
import useStores from "../hooks/useStores";
// Components
import { Loader } from "../styled/Loader";
import { UserProfileCard } from "../components/UserProfileCard";
// Helpers/constants
import { getDataWithHeaders } from "../helpers/APICalls";
import { APIUrls } from "../constants/APIUrls";
import { withLoader } from "../hocs/withLoader";

export const Homepage = observer(() => {
  const {
    rootStore: { loadingStore, userStore }
  } = useStores();

  useEffect(() => {
    const fetchUsers = async () => {
      const resp = await getDataWithHeaders(APIUrls.allUsers);
      userStore.setUsers(resp.data.slice(0, 10));
      console.log(userStore.users);
      loadingStore.setIsLoading(false);
    };

    fetchUsers();
  }, [loadingStore, userStore]);

  return (
    <>
      {/* {loadingStore.isLoading ? (
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
      ) : ( */}
      <div>
        {userStore.users.map((user, index) => (
          <UserProfileCard
            username={user.username}
            profileImage={user.profileImage}
            id={user.id}
            key={index}
          />
        ))}
      </div>
      {/* )} */}
    </>
  );
});
