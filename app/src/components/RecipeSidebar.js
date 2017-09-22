import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
 
const RecipeSidebar = ({ recipes }) => (
  <div className="col-6 col-md-3 sidebar-offcanvas" id="sidebar">
    <div className="list-group">
    {recipes.map(recipe => (
      <NavLink
        exact
        to={`/recipes/${recipe.id}`}
        key={recipe.id}
        className="list-group-item"
      >
        {recipe.name}
      </NavLink>
    ))}
    </div>
  </div>
);

RecipeSidebar.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeSidebar;