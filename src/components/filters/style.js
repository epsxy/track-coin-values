import RadioGroup from "@material-ui/core/RadioGroup";
import styled from "styled-components";

export const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1em;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;

export const TimeLengthGroup = styled(RadioGroup)`
  && {
    justify-content: center;
  }
`;
