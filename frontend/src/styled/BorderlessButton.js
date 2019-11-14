import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: none;
  text-transform: uppercase;
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  font-weight: 700;
  letter-spacing: 3px;
`;

const BorderlessButton = ({ innerText, backgroundColor }) => (
  <Button backgroundColor={backgroundColor}>{innerText}</Button>
);

export default BorderlessButton;
