import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './context'

import 'bulma/css/bulma.min.css'

import Index from './pages/index'
import NewCollab from './pages/new'
import Page404 from './pages/404'

function App() {
  return (
    <Provider>
      <Router>
        <Suspense fallback={<div>Chargement...</div>}>
          <Switch>
            <Route exact path="/collabs" component={Index}/>
            <Route exact path="/collabs/new" component={NewCollab}/>
            <Route exact path="/collabs/edit/:id" component={NewCollab}/>
            <Route fallback component={Page404} />
          </Switch>
        </Suspense>
      </Router>
    </Provider>
  )
}

export default App;
