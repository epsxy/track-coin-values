import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import {
  HeaderContainer,
  AppHeader,
  AppTitleContainer,
  AppTitleText,
  ContributeContainer,
  GithubProjectLink
} from "./style";

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
