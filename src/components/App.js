import React from "react";
import Header from "./Header";
import Graph from "./Graph";
import Filters from "./Filters";
import VariationRateReport from "./VariationRateReport";

const App = () => (
  <div>
    <Header />
    <Filters />
    <Graph />
    <VariationRateReport />
  </div>
);

export default App;
