import React, { Component } from 'react';
import { Route, Switch, } from 'react-router';

import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TripsListCard from './components/TripsList';

/**
 * Компонент маршрутизации.
 *
 * @component
 * @example
 * <Route component={App}/>
 */
class App extends Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        <Switch>
          <Route
            location={location}
            path='/'
            exact
            render={() => {
              return (
                <MainPage history={this.props.history}/>
              )
            }}
          />
          <Route
            location={location}
            path='/auth'
            exact
            component={SignIn}
          />
          <Route
            location={location}
            path='/register'
            exact
            component={SignUp}
          />
          <Route
            location={location}
            path='/trips'
            exact
            component={TripsListCard}
          />
          <Route
            location={location}
            path='/trip/:id'
            exact
            component={MainPage}
          />
        </Switch>
      </div>
    )
  }
}

export default App;