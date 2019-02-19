import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './component/Home.js'
import Credits from './component/Credits.js'
import Game from './component/Game.js'
import './global/index.css'

const mapStateToProps = function(state,props) {
  return {}
}

const mapDispatchToProps = dispatch => ({
  
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Credits" component={Credits} />
            <Route exact path='/Game/:usernames' component={Game}/>
          </Switch>
        </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
