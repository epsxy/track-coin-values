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

import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { graphData: [] };
  }
  componentDidMount() {
    fetch("https://api.coinranking.com/v1/public/coin/1335/history/7d?base=EUR")
      .then(res => res.json())
      .then(res => {
        this.setState({ graphData: res.data.history });
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <ResponsiveContainer width="90%" height={300}>
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
              domain={[1551391200000, 1551995273741]}
              tickFormatter={timestamp =>
                moment(timestamp).format("YYYY-MM-DD")
              }
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
