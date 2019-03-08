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
import Typography from "@material-ui/core/Typography";

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphData: [],
      coinId: "1",
      timeLength: "7d",
      baseCurrency: "EUR",
      coinList: []
    };
  }
  componentDidMount() {
    this.fetchCoinData();
    this.fetCoinList();
  }

  fetCoinList = () => {
    console.log(this.state.timeLength);
    fetch(`https://api.coinranking.com/v1/public/coins`)
      .then(res => res.json())
      .then(res => {
        this.setState({ coinList: res.data.coins });
      });
  };

  fetchCoinData = () => {
    console.log(this.state.timeLength);
    fetch(
      `https://api.coinranking.com/v1/public/coin/${
        this.state.coinId
      }/history/${this.state.timeLength}?base=${this.state.baseCurrency}`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({ graphData: res.data.history });
      });
  };

  updateTimeLength = event => {
    this.setState({ timeLength: event.target.value }, () => {
      this.fetchCoinData();
    });
  };

  updateCoinId = event => {
    this.setState({ coinId: event.target.value }, () => {
      this.fetchCoinData();
    });
  };

  updateBaseCurrencyId = event => {
    this.setState({ baseCurrency: event.target.value }, () => {
      this.fetchCoinData();
    });
  };

  render() {
    const coinsList = this.state.coinList.map(coin => {
      return <MenuItem value={coin.id}>{coin.name}</MenuItem>;
    });
    return (
      <div className="App">
        <Typography variant="h1" gutterBottom>
          Coin tracker
        </Typography>
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
        <RadioGroup
          aria-label="position"
          name="position"
          value={this.state.timeLength}
          onChange={this.updateTimeLength}
          row
        >
          <FormControlLabel
            value="24h"
            control={<Radio color="primary" />}
            label="24 hours"
            labelPlacement="end"
          />
          <FormControlLabel
            value="7d"
            control={<Radio color="primary" />}
            label="7 days"
            labelPlacement="end"
          />
          <FormControlLabel
            value="30d"
            control={<Radio color="primary" />}
            label="30 days"
            labelPlacement="end"
          />
          <FormControlLabel
            value="1y"
            control={<Radio color="primary" />}
            label="1 year"
            labelPlacement="end"
          />
          <FormControlLabel
            value="5y"
            control={<Radio color="primary" />}
            label="5 years"
            labelPlacement="end"
          />
        </RadioGroup>
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
        <FormControl>
          <InputLabel htmlFor="base-currency-input">Currency</InputLabel>
          <Select
            value={this.state.baseCurrency}
            onChange={this.updateBaseCurrencyId}
            input={<Input name="baseCurrencyId" id="base-currency-input" />}
          >
            <MenuItem value="EUR">Euro</MenuItem>
            <MenuItem value="USD">Dollar USD</MenuItem>
            <MenuItem value="JPY">Japanese Yen</MenuItem>
          </Select>
          <FormHelperText>Select the base currency</FormHelperText>
        </FormControl>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
