import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

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
  display: flex;
  align-items: center;
`;

const AppTitleText = styled(Typography)`
  && {
    margin-left: 0.5em;
  }
`;

const ContributeContainer = styled.div`
  margin-right: 1em;
`;

const GithubProjectLink = styled.a`
  font-size: 1.5em;
  color: inherit;
  &:hover {
    color: #f50057;
  }
`;

class Header extends Component {
  render() {
    return (
      <HeaderContainer>
        <AppHeader position="absolute" color="primary">
          <AppTitleContainer>
            <FontAwesomeIcon icon={faCoins} />
            <AppTitleText variant="h6" color="inherit">
              Crypto currency value traker
            </AppTitleText>
          </AppTitleContainer>
          <ContributeContainer>
            <Typography variant="h6" color="inherit">
              <GithubProjectLink href="https://github.com/epsxy/track-coin-values">
                <FontAwesomeIcon icon={faGithub} />
              </GithubProjectLink>
            </Typography>
          </ContributeContainer>
        </AppHeader>
      </HeaderContainer>
    );
  }
}

export default Header;
