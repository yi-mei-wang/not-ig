import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getDataWithHeaders } from "../helpers/APICalls";
import { APIUrls } from "../constants/APIUrls";
import { GracefulImage } from "../styled/GracefulImage";

const Container = styled.div`
  /* display: flex;
  width: 900px;
  flex-wrap: wrap;
  border: 1px solid black;
  justify-content: space-evenly; */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;

export const UserImages = ({ id }) => {
  const [imgUrls, setImgUrls] = useState([]);

  useEffect(() => {
    let path = id === "me" ? APIUrls.myImages : `${APIUrls.userImages}${id}`;

    let headers = id === "me";

    const fetchData = async () => {
      const resp = await getDataWithHeaders(path, headers);
      setImgUrls(resp.data);
    };
    fetchData();
  }, [id]);

  return (
    <Container>
      {imgUrls.map((url, index) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <GracefulImage
            src={url}
            width="250px"
            height="250px"
            key={index}
            alt="User posts"
            round={0}
          />
        </a>
      ))}
    </Container>
  );
};
