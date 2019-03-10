import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { AppFooter, FooterText, FooterLink } from "./style";

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
