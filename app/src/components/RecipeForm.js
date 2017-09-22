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
        The form page container that this component is wrapped in
        is already wired up to use the appropriate redux actions.
        All you have to do is call the <code>onSave</code> and <code>fieldChanged</code>
        callbacks from the RecipeForm component
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