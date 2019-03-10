import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

export const HeaderContainer = styled.div`
  margin-bottom: 85px;
`;

export const AppHeader = styled(AppBar)`
  && {
    top: 0;
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const AppTitleContainer = styled.div`
  margin-left: 1em;
  display: flex;
  align-items: center;
`;

export const AppTitleText = styled(Typography)`
  && {
    margin-left: 0.5em;
  }
`;

export const ContributeContainer = styled.div`
  margin-right: 2em;
`;

export const GithubProjectLink = styled.a`
  font-size: 1.5em;
  color: inherit;
  &:hover {
    color: #f50057;
  }
`;
