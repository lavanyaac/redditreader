import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home'
import ManageSubscriptions from './ManageSubscriptions/ManageSubscriptions';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reddit Reader</h1>
        </header>
        <BrowserRouter>
          <Switch>
            <Route name="home" exact path="/" component={() => (<Home />)}/>
            <Route name="managesubscriptions" path="/managesubscriptions" component={() => (<ManageSubscriptions />)}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
