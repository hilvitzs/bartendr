import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Recipe = ({ recipe }) => {
  const { name, category, preparation, rating, glass, ingredients } = recipe;

  return (
    <div id="recipe">
      <p>Cocktail: {name}</p>
      <p>Cocktail Category: {category}</p>
      <p>Preparation Instructions: {preparation}</p>
      <p>Rating: {rating}</p>
      <p>Glass to serve: {glass}</p>
      <p>Ingredients:</p>
      <ul>
        {ingredients.map(ingredient =>
          (<div key={Math.random()}>
            <li>{ingredient.name} - {ingredient.amount} {ingredient.unit}.</li>
          </div>)
        )}
      </ul>
    </div>
  );
};

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default Recipe;
