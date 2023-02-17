import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import SpecificRestaurant from './components/SpecificRestaurant'
import Cart from './components/Cart'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const App = () => (
  <Switch>
    {' '}
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={SpecificRestaurant}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route component={PageNotFound} />
  </Switch>
)

export default App
