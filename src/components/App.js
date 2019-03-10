import React from "react";
import Header from "./header/Header";
import Graph from "./graph/Graph";
import Filters from "./filters/Filters";
import VariationRateReport from "./variationReport/VariationRateReport";

const App = () => (
  <div>
    <Header />
    <Filters />
    <Graph />
    <VariationRateReport />
  </div>
);

export default App;
