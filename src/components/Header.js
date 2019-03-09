import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const MainTitle = styled(Typography)`
  && {
    text-align: center;
    font-size: 4rem;
  }
`;

class Filters extends Component {
  render() {
    return (
      <div>
        <MainTitle variant="h1" gutterBottom>
          Coin tracker
        </MainTitle>
      </div>
    );
  }
}

export default Filters;
