import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";

const VariationRateReportContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media (max-width: 550px) {
    flex-direction: column;
    min-height: 250px;
  }
`;

const PageTitle = styled(Typography)`
  && {
    font-size: 1.5em;
    margin-right: 1em;
    @media (max-width: 550px) {
      margin-bottom: 1em
      margin-right: 0;
    }
  }
`;

const RateText = styled(Typography)`
  && {
    font-size: 2em;
    margin-left: 0.5em;
    @media (max-width: 550px) {
      margin-top: 1em;
      margin-left: 0;
    }
  }
`;

const NoDataText = styled(Typography)`
  && {
    font-size: 2em;
    margin-left: 0.5em;
    @media (max-width: 550px) {
      margin-top: 1em;
      margin-left: 0;
    }
  }
`;

class VariationRateReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinHistory: [],
      variation: undefined
    };
  }

  componentDidMount = () => {
    this.fetchCoinData();
  };

  fetchCoinData = () => {
    fetch(
      `https://api.coinranking.com/v1/public/coin/${
        this.props.coinId
      }/history/5y?base=EUR`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({ coinHistory: res.data.history });
      });
  };

  updateDateValue = event => {
    this.setState({ currentDate: event.target.value }, () => {
      this.computePriceVariation();
    });
  };

  /*
  * TODO:
  ° - Split the code
  * - Refactor the code
  * - Factorise the code
  * - Test the code
  */
  computePriceVariation = () => {
    const valuesCurrentDay = this.state.coinHistory.filter(
      value =>
        moment(value.timestamp).format("YYYY-MM-DD") === this.state.currentDate
    );
    console.log(`valuesCurrentDay=${valuesCurrentDay}`);
    if (!valuesCurrentDay) {
      this.setState({ variation: undefined });
      return;
    }
    const indexOfSelectedValue = this.state.coinHistory.indexOf(
      valuesCurrentDay[0]
    );
    console.log(`indexOfSelectedValue=${indexOfSelectedValue}`);

    if (indexOfSelectedValue <= 0) {
      this.setState({ variation: undefined });
      return;
    }

    /* ISSUE */
    const previousValue = this.state.coinHistory[indexOfSelectedValue - 1];
    const valuesPreviousDay = this.state.coinHistory.filter(
      value =>
        moment(value.timestamp).format("YYYY-MM-DD") ===
        moment(previousValue.timestamp).format("YYYY-MM-DD")
    );
    console.log(`previousValue=${previousValue}`);
    console.log(`valuesPreviousDay=${valuesPreviousDay}`);

    const averageValuePreviousDay =
      valuesPreviousDay.reduce((sum, data) => {
        return sum + parseFloat(data.price);
      }, 0) / valuesPreviousDay.length;
    const averageValueCurrentDay =
      valuesCurrentDay.reduce((sum, data) => {
        return sum + parseFloat(data.price);
      }, 0) / valuesCurrentDay.length;
    console.log(`averageValuePreviousDay=${averageValuePreviousDay}`);
    console.log(`averageValueCurrentDay=${averageValueCurrentDay}`);

    const percentage =
      ((averageValueCurrentDay - averageValuePreviousDay) * 100) /
      averageValuePreviousDay;
    const variation = Math.round(percentage * 100) / 100;
    console.log(`variation=${variation}`);
    this.setState({ variation: variation });
  };

  render() {
    return (
      <VariationRateReportContainer>
        <PageTitle variant="h2" gutterBottom>
          Compare date with previous day
        </PageTitle>
        <form noValidate>
          <TextField
            id="date"
            label="Date"
            type="date"
            onChange={this.updateDateValue}
            InputLabelProps={{
              shrink: true
            }}
          />
        </form>
        {this.state.variation !== undefined && (
          <RateText
            variant="body1"
            gutterBottom
            color={this.state.variation >= 0 ? "primary" : "secondary"}
          >
            {this.state.variation > 0 && <ArrowUpward />}
            {this.state.variation < 0 && <ArrowDownward />}
            {this.state.variation === 0 && <ArrowForward />}
            {Math.abs(this.state.variation)}%
          </RateText>
        )}
        {this.state.variation === undefined && (
          <NoDataText color="textSecondary">No data</NoDataText>
        )}
        <div />
      </VariationRateReportContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    coinId: state.coinId
  };
};

export default connect(mapStateToProps)(VariationRateReport);
