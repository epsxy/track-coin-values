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

import "./styles.css";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: []
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
        this.setState({ graphData: res.data.history });
      });
  };

  updateCoinId = event => {
    this.setState({ coinId: event.target.value }, () => {
      this.fetchCoinData();
    });
  };

  formatTimestamp = timestamp => {
    if (this.props.timeLength === "24h") return moment(timestamp).format("LT");
    return moment(timestamp).format("L");
  };

  render() {
    return (
      <div>
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
              minTickGap={35}
              tickFormatter={timestamp => this.formatTimestamp(timestamp)}
            />
            <YAxis type="number" domain={["auto", "auto"]} />
            <Tooltip
              labelFormatter={(timestamp, price, props) => [
                moment(timestamp).format("LLL"),
                price
              ]}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#9c27b0"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
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
