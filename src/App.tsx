import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "spectre.css/dist/spectre.min.css";
import "./App.css";
import { About } from "./Components/Pages";
import { Create } from "./Components/Playlist";
import { Page } from "./Components/Pages";
import { Box, Button, Heading, Grommet } from "grommet";
import { AddCircle, Github, StatusInfo } from "grommet-icons";
import styled from "styled-components";
import ReactGA from "react-ga";
ReactGA.initialize("UA-146751022-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const theme = {
  global: {
    colors: {
      brand: "#228BE6"
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px"
    }
  }
};

const AppBar = (props: any) => (
  <Box
    tag="header"
    direction="row"
    align="center"
    justify="between"
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="medium"
    style={{ zIndex: "1" }}
    {...props}
  />
);

const HeaderLinks = styled(Box)`
  a {
    padding-left: 10px;
  }
`;

class App extends Component {
  render() {
    return (
      <Router>
        <Grommet theme={theme}>
          <AppBar>
            <Heading level="3" margin="none">
              Check This Playlist!
            </Heading>
            <HeaderLinks align="end" direction="row">
              <Link to="/create">
                <AddCircle />
              </Link>
              <Link to="/about">
                <StatusInfo />
              </Link>
              <a href="https://github.com/ramigb/playlist" target="_blank">
                <Github />
              </a>
            </HeaderLinks>
          </AppBar>

          <Box
            direction="row"
            flex
            overflow={{ horizontal: "hidden" }}
            pad="small"
          >
            <Route exact path="/" component={Create} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/p/:encodedPage" component={Page} />
            <Route exact path="/about" component={About} />
          </Box>
        </Grommet>
      </Router>
    );
  }
}

export default App;
