import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  AreaChart,
  ReferenceLine,
  Area,
  LineChart,
  Line,
  XAxis,
  Label,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import moment from "moment";
import green from "@material-ui/core/colors/green";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { connect } from "react-redux";

import "./styles.css";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      coinId: "1",
      baseCurrency: "EUR",
      coinList: []
    };
  }
  componentDidMount() {
    this.fetchCoinData();
    this.fetCoinList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchCoinData();
    }
  }

  fetCoinList = () => {
    console.log(this.props.timeLength);
    fetch(`https://api.coinranking.com/v1/public/coins`)
      .then(res => res.json())
      .then(res => {
        this.setState({ coinList: res.data.coins });
      });
  };

  fetchCoinData = () => {
    fetch(
      `https://api.coinranking.com/v1/public/coin/${
        this.state.coinId
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

  render() {
    const coinsList = this.state.coinList.map(coin => {
      return (
        <MenuItem key={coin.id} value={coin.id}>
          {coin.name}
        </MenuItem>
      );
    });
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
              tick={true}
              type="number"
              domain={["dataMin", "dataMax"]}
              tickFormatter={timestamp =>
                moment(timestamp).format("YYYY-MM-DD")
              }
            />
            <YAxis />
            <Tooltip
              labelFormatter={(timestamp, price, props) => [
                moment(timestamp).format("LLL"),
                price
              ]}
            />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        <FormControl>
          <InputLabel htmlFor="coin-id-input">Coin</InputLabel>
          <Select
            value={this.state.coinId}
            onChange={this.updateCoinId}
            input={<Input name="coinId" id="coin-id-input" />}
          >
            {coinsList}
          </Select>
          <FormHelperText>Select your coin</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    timeLength: state.timeLength,
    currency: state.currency
  };
};

export default connect(mapStateToProps)(Graph);
