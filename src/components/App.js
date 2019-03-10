import React from "react";
import Header from "./header/Header";
import Graph from "./graph/Graph";
import Filters from "./filters/Filters";
import VariationRateReport from "./variationReport/VariationRateReport";
import Footer from "./footer/Footer";
import styled from "styled-components";

const ViewContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding: 0 10px;
`;

const App = () => (
  <ViewContainer>
    <Header />
    <Content>
      <Filters />
      <Graph />
      <VariationRateReport />
    </Content>
    <Footer />
  </ViewContainer>
);

export default App;
