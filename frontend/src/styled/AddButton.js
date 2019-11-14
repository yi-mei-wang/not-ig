import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1),
    "&:focus": {
      outline: "none"
    }
  }
}));

export const AddButton = () => {
  const classes = useStyles();

  return (
    <Container>
      <Fab color="primary" aria-label="add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </Container>
  );
};
