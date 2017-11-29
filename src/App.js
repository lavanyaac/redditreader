import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home.js'
import EditSubscriptions from './EditSubscriptions.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reddit Reader</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route name="home" path="/" component={(props) => (<Home />)}/>
            <Route name="editsubscriptions" path="/editsubscriptions" component={(props) => (<EditSubscriptions />)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
