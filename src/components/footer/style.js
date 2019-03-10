import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export const AppFooter = styled(AppBar)`
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

export const FooterText = styled(Typography)`
  && {
    margin-left: 0.5em;
  }
`;

export const FooterLink = styled.a`
  font-size: 0.8em;
  color: inherit;
  text-decoration: none;
  &:hover {
    color: #f50057;
  }
`;
