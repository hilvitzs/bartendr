import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchRecipe, createRecipe, updateRecipe } from '../actions/recipeActions';
import ErrorPage from '../containers/ErrorPage';
import RecipeForm from '../components/RecipeForm';

class RecipeFormPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: Object.assign({}, props.recipe)
    };

    this.updateField = this.updateField.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
  }

  componentDidMount() {
    let id = this.props.match.params.id;
    if (id) {
      this.props.actions.fetchRecipe(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.recipe.id != nextProps.recipe.id) {
      this.setState({ recipe: Object.assign({}, nextProps.recipe) });
    }
  }

  updateField(event) {
    const field = event.target.name;
    let recipe = Object.assign({}, this.state.recipe);
    recipe[field] = event.target.value;
    return this.setState({ recipe });
  }

  saveRecipe(event) {
    event.preventDefault();

    const { recipe } = this.state;
    const save = recipe.id ?
      this.props.actions.updateRecipe
    : this.props.actions.createRecipe;

    save(recipe);
  }

  render() {
    if (this.props.error) {
      return <ErrorPage error={this.props.error} />;
    }
    return (
      <RecipeForm
        fieldChanged={this.updateField}
        onSave={this.saveRecipe}
        recipe={this.state.recipe}
      />
    );
  }
}

RecipeFormPage.propTypes = {
  actions: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object,
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
  return {
    recipe: state.recipes[0] || initialRecipe,
    error: state.error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => (
  { actions: bindActionCreators({
    fetchRecipe,
    createRecipe,
    updateRecipe
  }, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(RecipeFormPage);