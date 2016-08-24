import React from 'react';
import {Route, IndexRoute} from 'react-router';
import AppContainer from '../containers/app-container';
import IndexContainer from '../containers/index-container';
import MapsContainer from '../containers/maps-container';

export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={IndexContainer}/>
      <Route path="/map" component={MapsContainer}/>
    </Route>
);
