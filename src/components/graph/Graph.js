import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import moment from "moment";
import { connect } from "react-redux";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";

const GraphContainer = styled.div`
  margin-bottom: 1em;
`;

const GraphControlsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      autoScaleY: true,
      hideY: false,
      reduceGraphPoints: false
    };
  }
  componentDidMount() {
    this.fetchCoinData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchCoinData();
    }
  }

  fetchCoinData = () => {
    fetch(
      `https://api.coinranking.com/v1/public/coin/${
        this.props.coinId
      }/history/${this.props.timeLength}?base=${this.props.currency}`
    )
      .then(res => res.json())
      .then(res => {
        const graphData = this.state.reduceGraphPoints
          ? this.refineGraphData(res.data.history)
          : res.data.history;
        this.setState({ graphData: graphData });
      });
  };

  updateCoinId = event => {
    this.setState({ coinId: event.target.value }, () => {
      this.fetchCoinData();
    });
  };

  updateScale = event => {
    this.setState({ autoScaleY: event.target.checked });
  };

  updateYVisibility = event => {
    this.setState({ hideY: event.target.checked });
  };

  reduceGraphPoints = event => {
    this.setState({ reduceGraphPoints: event.target.checked }, () => {
      this.fetchCoinData();
    });
  };

  getScaleSize = () => {
    switch (this.props.timeLength) {
      case "24h":
        return "MMMM Do YYYY, h a";
      case "7d":
        return "L";
      case "30d":
        return "L";
      case "1y":
        return "MMMM YYYY";
      case "5y":
        return "MMMM YYYY";
      default:
        return "L";
    }
  };

  /*
   * Will refine the data and reduce the number of points.
   * - Only 1 per hour if timeLength is 24 hours
   * - Only 1 per 1 day timeLength is 7 days or 30 days
   * - Only 1 per month if timeLength is 1 year or 5 years
   * returns { timestamp, price }, where timestamp is the exact
   * time stamp for this moment, and price is the average value during
   * the hour/day/month (depending on the selecting timeLength)
   */
  /*
  * TODO:
  ° - Split the code
  * - Refactor the code
  * - Factorise the code
  * - Test the code
  */
  refineGraphData = graphData => {
    let pricesIndexedByCommonDate = graphData.reduce((accumulator, data) => {
      const currentDateIndex = moment(data.timestamp).format(
        this.getScaleSize()
      );
      if (accumulator[currentDateIndex]) {
        accumulator[currentDateIndex]["price"].push(data.price);
      } else {
        accumulator[currentDateIndex] = {
          timestamp: data.timestamp,
          price: [data.price]
        };
      }
      return accumulator;
    }, {});
    const meanPricesByDate = Object.keys(pricesIndexedByCommonDate).map(key => {
      const exactTimestamp = pricesIndexedByCommonDate[key].timestamp;
      const pricesArray = pricesIndexedByCommonDate[key].price;
      const meanPriceForCurrentDate = (
        pricesArray.reduce((sum, price) => {
          return sum + parseFloat(price);
        }, 0) / pricesArray.length
      ).toString();
      return {
        timestamp: exactTimestamp,
        price: meanPriceForCurrentDate
      };
    });
    return meanPricesByDate;
  };

  formatXAxisLabel = timestamp => {
    if (this.props.timeLength === "24h")
      return moment(timestamp).format("DD-MM-YYYY h:m a");
    return moment(timestamp).format("DD-MM-YYYY");
  };

  formatTooltip = (timestamp, price, props) => {
    return this.state.reduceGraphPoints
      ? [moment(timestamp).format(this.getScaleSize()), price]
      : [this.formatXAxisLabel(timestamp), price];
  };

  render() {
    return (
      <GraphContainer>
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={this.state.graphData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              domain={["dataMin", "dataMax"]}
              minTickGap={25}
              tickFormatter={timestamp => this.formatXAxisLabel(timestamp)}
            />
            <YAxis
              type="number"
              hide={this.state.hideY}
              domain={[this.state.autoScaleY ? "auto" : 0, "auto"]}
            />
            <Tooltip
              labelFormatter={(timestamp, price, props) =>
                this.formatTooltip(timestamp, price, props)
              }
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#9c27b0"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <GraphControlsContainer>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.autoScaleY}
                onChange={this.updateScale}
                value="scale"
                color="primary"
              />
            }
            label="Relative Scale Price"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.hideY}
                onChange={this.updateYVisibility}
                value="hideY"
                color="secondary"
              />
            }
            label="Hide Price"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.reduceGraphPoints}
                onChange={this.reduceGraphPoints}
                value="reduceGraphPoints"
                color="secondary"
              />
            }
            label="Reduce graph points"
          />
        </GraphControlsContainer>
      </GraphContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    timeLength: state.timeLength,
    currency: state.currency,
    coinId: state.coinId
  };
};

export default connect(mapStateToProps)(Graph);
