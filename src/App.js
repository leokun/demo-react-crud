import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'bulma/css/bulma.min.css'

import Index from './pages/index'
import Page404 from './pages/404'

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Chargement...</div>}>
        <Switch>
          <Route exact path="/collabs" component={Index}/>
          <Route fallback component={Page404} />
        </Switch>
      </Suspense>
  </Router>
  )
}

export default App;
