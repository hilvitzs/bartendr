import React from 'react';
import PropTypes from 'prop-types';

const RecipeForm = ({ fieldChanged, onSave, recipe }) => (
  <div className="container">
    <h1>TODO: Complete this form component</h1>
    <p>It should:</p>
    <ul>
      <li>Be nice to look at</li>
      <li>Be user-friendly</li>
      <li>Populate the form field with the right values if editing an existing recipe</li>
      <li>Redirect on successful create/update</li>
      <li>Give some useful feedback to the user that something happened</li>
    </ul>
    <p>Tips:</p>
    <ul>
      <li>
        This form handles both editing and creating a recipe.
        You shouldn't need to create two separate components to
        get this done
      </li>
      <li>
        Feel free to change the form's parent component `RecipeFormPage`.
      </li>
    </ul>
  </div>
);

RecipeForm.propTypes = {
  fieldChanged: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired
};

export default RecipeForm;