import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/recipeActions';
import ErrorPage from '../containers/ErrorPage';
import Recipe from '../components/Recipe';

class RecipePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.fetchRecipe(this.props.match.params.id);
  }

  render() {
    const { recipe } = this.props;
    if (this.props.error) {
      return <ErrorPage error={this.props.error} />;
    }
    return (
      <div className="container">
        <Recipe recipe={recipe} />
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
