import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import { connect } from "react-redux";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import ArrowForward from "@material-ui/icons/ArrowForward";
import {
  VariationRateReportContainer,
  PageTitle,
  RateText,
  NoDataText
} from "./style";

class VariationRateReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinHistory: [],
      variation: undefined,
      valueSelectedDay: undefined,
      isVariationInitialized: false
    };
  }

  componentDidMount = () => {
    this.fetchCoinData();
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchCoinData();
    }
  }

  fetchCoinData = () => {
    fetch(
      `https://api.coinranking.com/v1/public/coin/${
        this.props.coinId
      }/history/5y?base=${this.props.currency}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({ coinHistory: res.data.history });
        this.computePriceVariation();
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
    if (!this.state.currentDate) {
      this.setState({
        isVariationInitialized: false,
        variation: undefined,
        valueSelectedDay: undefined
      });
      return;
    }
    const valuesCurrentDay = this.state.coinHistory.filter(
      value =>
        moment(value.timestamp).format("YYYY-MM-DD") === this.state.currentDate
    );
    if (!valuesCurrentDay) {
      this.setState({
        isVariationInitialized: true,
        variation: undefined,
        valueSelectedDay: undefined
      });
      return;
    }
    const indexOfSelectedValue = this.state.coinHistory.indexOf(
      valuesCurrentDay[0]
    );

    if (indexOfSelectedValue <= 0) {
      this.setState({
        isVariationInitialized: true,
        variation: undefined,
        valueSelectedDay: undefined
      });
      return;
    }

    const previousValue = this.state.coinHistory[indexOfSelectedValue - 1];
    const valuesPreviousDay = this.state.coinHistory.filter(
      value =>
        moment(value.timestamp).format("YYYY-MM-DD") ===
        moment(previousValue.timestamp).format("YYYY-MM-DD")
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

    /*
     * TODO: This is a quick fix.
     * Some crypto currency values are very small, like 0.0078.
     * Other ones are very big, such as 4000.
     * Need to implement a truncate function to deal with this rage of values.
     */
    const valueSelectedDay =
      averageValueCurrentDay > 10
        ? Math.round(averageValueCurrentDay)
        : Math.round(averageValueCurrentDay * 1000) / 1000;
    this.setState({
      isVariationInitialized: true,
      variation: variation,
      valueSelectedDay: valueSelectedDay
    });
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
        {this.state.valueSelectedDay !== undefined && (
          <RateText variant="body1" gutterBottom color="textSecondary">
            {this.state.valueSelectedDay}
            {this.props.currency}
          </RateText>
        )}
        {this.state.variation !== undefined &&
          this.state.isVariationInitialized && (
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
        {this.state.variation === undefined &&
          this.state.isVariationInitialized && (
            <NoDataText color="textSecondary">No data</NoDataText>
          )}
        <div />
      </VariationRateReportContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    coinId: state.coinId,
    currency: state.currency
  };
};

export default connect(mapStateToProps)(VariationRateReport);
