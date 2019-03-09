import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

class Filters extends Component {
  render() {
    return (
      <div>
        <Typography
          variant="h1"
          gutterBottom
          style={{ textAlign: "center", fontSize: "4rem" }}
        >
          Coin tracker
        </Typography>
      </div>
    );
  }
}

export default Filters;
