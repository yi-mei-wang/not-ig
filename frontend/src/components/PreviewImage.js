import React from "react";
import styled from "styled-components";
// import { ReactComponent as DeleteButton } from "../delete-button.svg";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 3px dashed #f50080;
  border-radius: 15px;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0 1rem 0;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

export const PreviewImage = ({ previewImage, message }) => (
  <>
    <h4 className="text-center">{message}</h4>
    <Container>
      {/* <DeleteButton style={{ width: "30px", height: "30px", position:"absolute", right: "0", top: "0" }} /> */}
      <label id="image-file-label" htmlFor="image-file"></label>
      {previewImage ? (
        <Img src={previewImage} alt="Preview upload" />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%"
          }}
        >
          <h5 style={{ height: "1rem" }}>Choose an image</h5>
        </div>
      )}
    </Container>
  </>
);
