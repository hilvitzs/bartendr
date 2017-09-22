import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes }) => (
  <div className="row">
    {recipes.map(recipe => (
      <RecipeCard key={recipe.id} {...recipe} />
    ))}
  </div>
);

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired
};

export default RecipeList;
