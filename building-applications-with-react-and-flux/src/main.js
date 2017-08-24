"use strict";

var InitializeActions = require('./actions/initializeActions');
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

InitializeActions.initApp();

Router.run(routes, /*Router.HistoryLocation, */function(Handler) {
	React.render(<Handler/>, document.getElementById('app'));
});