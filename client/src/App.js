import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import MoviesList from "./pages/MoviesList";
import TopRated from "./pages/TopRated";
import NewReleases from "./pages/NewReleases";
import Popular from "./pages/Popular";
import NowPlaying from "./pages/NowPlaying";

import TVLatest from "./pages/TVLatest";
import TVOnTheAir from "./pages/TVOnTheAir";
import TVPopular from "./pages/TVPopular";
import TVTopRated from "./pages/TVTopRated";
import MoviePage from "./pages/MoviePage";



class App extends React.Component {
  componentDidMount() {
    document.title = "Good Watches";
  }
  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/saved" component={Saved} />
            <Route exact path="/movieslist" component={MoviesList} />
            {/* Movie Routes */}
            <Route exact path="/topratedmovies" component={TopRated} />
            <Route exact path="/upcoming" component={NewReleases} />
            <Route exact path="/popular" component={Popular} />
            <Route exact path="/nowplaying" component={NowPlaying} />
            {/* TV Routes */}
            <Route exact path="/latestshows" component={TVLatest} />
            <Route exact path="/ontheair" component={TVOnTheAir} />
            <Route exact path="/populartv" component={TVPopular} />
            <Route exact path="/topratedtv" component={TVTopRated} />
            {/* <Route component={NoMatch} /> */}
            <Route exact path="/moviepage" component={MoviePage} />
          </Switch>
        </div>
      </Router>

    );
  }
}

export default App;
