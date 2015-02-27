'use strict';

import React from 'react';
import Router, {Route, NotFoundRoute, DefaultRoute, Redirect} from 'react-router';

import Base from './components/Base';
import DocumentList from './components/DocumentList';
import DocumentFormContainer from './components/DocumentFormContainer';
import DocumentPreview from './components/DocumentPreview';
import NotFound from './components/NotFound';

var Routes = [
  <Route name="base" handler={Base}>
    <Redirect from="/" to="/documents" />
    <Route name="list" path="/documents" handler={DocumentList} />
    <Route name="form_create" path="/documents/create" handler={DocumentFormContainer} />
    <Route name="preview" path="/documents/:id" handler={DocumentPreview} />
    <Route name="form" path="/documents/:id/edit" handler={DocumentFormContainer} />
  </Route>,
  <NotFoundRoute handler={NotFound} />
];

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, document.body);
});
