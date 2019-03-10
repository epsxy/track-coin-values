import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const AppFooter = styled(AppBar)`
  && {
    height: 50px;
    position: relative;
    margin-top: 40px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media (max-width: 550px) {
      margin-top: 0;
    }
  }
`;

const FooterText = styled(Typography)`
  && {
    margin-left: 0.5em;
  }
`;

const FooterLink = styled.a`
  font-size: 0.8em;
  color: inherit;
  text-decoration: none;
  &:hover {
    color: #f50057;
  }
`;

class Footer extends Component {
  render() {
    return (
      <div>
        <AppFooter position="absolute" color="primary">
          <FooterText variant="h6" color="inherit">
            <FooterLink href="https://epsxy.xyz">
              Made with <FontAwesomeIcon icon={faHeart} /> by Epsxy
            </FooterLink>
          </FooterText>
        </AppFooter>
      </div>
    );
  }
}

export default Footer;
