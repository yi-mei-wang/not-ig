import React from "react";
import Image from "react-graceful-image";
import styled from "styled-components";

const Container = styled.div`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: #fbfbfb;
  position: relative;
  display: inline-block;
  overflow: hidden;
`;

export const GracefulImage = ({ src, width, height, alt, round }) => (
  <Container width={width} height={height} round={round}>
    <Image
      src={src}
      alt={alt}
      width={round === 1 ? "90%" : "100%"}
      style={{
        borderRadius: round === 1 ? "50%" : 0,
        objectFit: "cover",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)"
      }}
    />
  </Container>
);
