import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";

const VariationRateReportContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PageTitle = styled(Typography)`
  && {
    font-size: 1.5em;
    margin-right: 1em;
  }
`;

const RateText = styled(Typography)`
  && {
    font-size: 2em;
    margin-bottom: 0;
    margin-left: 1em;
  }
`;

class VariationRateReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinHistory: [],
      variation: ""
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

  /*
  * TODO:
  ° - Split the code
  * - Refactor the code
  * - Factorise the code
  * - Test the code
  */
  updateDateValue = event => {
    const valuesCurrentDay = this.state.coinHistory.filter(
      value =>
        moment(value.timestamp).format("YYYY-MM-DD") === event.target.value
    );
    if (!valuesCurrentDay) {
      this.setState({ variation: undefined });
      return;
    }
    const indexOfSelectedValue = this.state.coinHistory.indexOf(
      valuesCurrentDay[0]
    );

    if (indexOfSelectedValue <= 0) {
      this.setState({ variation: undefined });
      return;
    }

    const previousValue = this.state.coinHistory[indexOfSelectedValue - 1];
    const valuesPreviousDay = this.state.coinHistory.filter(
      value => value.timestamp === previousValue.timestamp
    );

    const averageValuePreviousDay =
      valuesPreviousDay.reduce((sum, data) => {
        return sum + parseFloat(data.price);
      }, 0) / valuesPreviousDay.length;
    const averageValueCurrentDay =
      valuesCurrentDay.reduce((sum, data) => {
        return sum + parseFloat(data.price);
      }, 0) / valuesCurrentDay.length;

    const percentage =
      ((averageValueCurrentDay - averageValuePreviousDay) * 100) /
      averageValuePreviousDay;
    const variation = Math.round(percentage * 100) / 100;
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
        {this.state.variation && (
          <RateText
            variant="body1"
            gutterBottom
            color={this.state.variation >= 0 ? "primary" : "secondary"}
          >
            {this.state.variation >= 0 && <ArrowUpward />}
            {this.state.variation < 0 && <ArrowDownward />}
            {Math.abs(this.state.variation)}%
          </RateText>
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
