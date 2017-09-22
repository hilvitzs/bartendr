import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
 
const RecipeCard = ({ id, ingredients, name, special }) => (
  <div className="col-6 col-lg-4">
    <h2>{name}</h2>
    <ul>
      {[...ingredients.map(ing => ing.name), ...special].map(name => (
        <li key={name}>{name}</li>
      ))}
    </ul>
    <p>
      <Link to={`/recipes/${id}`} className="btn btn-secondary">View details &raquo;</Link>
    </p>
  </div>
);

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  ingredients: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  special: PropTypes.array
};

RecipeCard.defaultProps = {
  special: []
};

export default RecipeCard;