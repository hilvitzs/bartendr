import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/recipeActions';
import ErrorPage from '../containers/ErrorPage';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.fetchRecipe(this.props.match.params.id);
  }

  render() {
    if (this.props.error) {
      return <ErrorPage error={this.props.error} />;
    }
    return (
      <div className="container">
        <h1>TODO: Make a display page for a recipe</h1>
        <p>It should:</p>
        <ul>
          <li>Be nice to look at</li>
          <li>Show information clearly (for humans)</li>
          <li>
            Have links/buttons/whatever for the user to edit/delete the recipe.
            The user should <em>only</em> be able to see these links if they are
            the owner of the recipe. (Hint: <code>currentUser</code> should already be in
            the redux store)
          </li>
          <li>The link to "edit" should link to the edit page for the recipe</li>
          <li>
            The link to "delete" should trigger a confirmation message before deleting the recipe,
            and then redirect to <code>/</code> if successful
          </li>
          <li>All other design decisions are up to you!</li>
        </ul>
        <p>Here is the recipe data from the current page:</p>
        <div style={{ whiteSpace: 'pre', fontSize: '12px' }}>
          {JSON.stringify(this.props.recipe, null, 2)}
        </div>
      </div>
    );
  }
}

RecipePage.propTypes = {
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  error: PropTypes.object
};

const mapStateToProps = state => {
  const initialRecipe = {
    id: '',
    created: '',
    name: '',
    glass: '',
    category: '',
    ingredients: [],
    special: [],
    garnish: '',
    preparation: '',
    rating: 0,
    user: {}
  };
  return{
    recipe: state.recipes[0] || initialRecipe,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators(actions, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);