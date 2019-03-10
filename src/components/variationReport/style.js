import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

export const VariationRateReportContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
    min-height: 250px;
  }
`;

export const PageTitle = styled(Typography)`
  && {
    font-size: 1.5em;
    margin-right: 1em;
    @media (max-width: 550px) {
      margin-bottom: 1em
      margin-right: 0;
    }
  }
`;

export const RateText = styled(Typography)`
  && {
    font-size: 2em;
    margin-left: 0.5em;
    min-width: 115px;
    @media (max-width: 550px) {
      margin-top: 1em;
      margin-left: 0;
    }
  }
`;

export const NoDataText = styled(Typography)`
  && {
    font-size: 2em;
    margin-left: 0.5em;
    @media (max-width: 550px) {
      margin-top: 1em;
      margin-left: 0;
    }
  }
`;
