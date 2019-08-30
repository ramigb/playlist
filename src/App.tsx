import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "spectre.css/dist/spectre.min.css";
import "./App.css";
import { About } from "./Components/Pages";
import { Create } from "./Components/Playlist";
import { Page } from "./Components/Pages";

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <header className="navbar">
            <section className="navbar-section">
              <span className="logo">PlayListGENER8R</span>
            </section>
            <section className="navbar-section">
              <Link to="/create" className="btn btn-link">
                Create
              </Link>
            </section>
            <section className="navbar-center"></section>
            <section className="navbar-section">
              <Link to="/about">About</Link>
              <a
                href="https://github.com/ramigb/playlist"
                className="btn btn-link"
              >
                GitHub
              </a>
            </section>
          </header>

          <div className="container">
            <Route exact path="/" component={Create} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/p/:encodedPage" component={Page} />
            <Route exact path="/about" component={About} />
          </div>
        </>
      </Router>
    );
  }
}

export default App;
