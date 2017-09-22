import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link, NavLink } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import HomePage from '../containers/HomePage';
import RecipePage from '../containers/RecipePage';
import RecipeFormPage from '../containers/RecipeFormPage';

const App = () => (
  <div>
    <nav className="navbar navbar-toggleable-md fixed-top navbar-inverse bg-inverse">
      <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <Link to="/" className="navbar-brand">Bartendr</Link>
      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><NavLink to="/" exact className="nav-link">Home</NavLink></li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <Link to="/recipes/new">
            <button className="btn btn-outline-success my-2 my-sm-0">Add a recipe</button>
          </Link>
        </form>
      </div>
    </nav>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/recipes/new" component={RecipeFormPage} />
      <Route exact path="/recipes/:id/edit" component={RecipeFormPage} />
      <Route exact path="/recipes/:id" component={RecipePage} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;