import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import Toolbar from "@material-ui/core/Toolbar";

import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import MoreIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";

const HeaderContainer = styled.div`
  margin-bottom: 65px;
`;

const AppHeader = styled(AppBar)`
  && {
    top: 0;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const AppTitleContainer = styled.div`
  margin-left: 1em;
`;

const ContributeContainer = styled.div`
  margin-right: 1em;
`;

class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <AppHeader position="absolute" color="primary">
          <AppTitleContainer>
            <Typography variant="h6" color="inherit">
              Crypto currency value traker
            </Typography>
          </AppTitleContainer>
          <ContributeContainer>
            <Typography variant="h6" color="inherit">
              Contribute
            </Typography>
          </ContributeContainer>
        </AppHeader>
      </HeaderContainer>
    );
  }
}

export default Header;
