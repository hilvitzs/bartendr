import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/recipeActions';
import RecipeList from '../components/RecipeList';
import RecipeSidebar from '../components/RecipeSidebar';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.fetchRecipes();
  }

  render() {
    return (
      <div className="container">
        <div className="row row-offcanvas row-offcanvas-right">
          <div className="col-12 col-md-9">
            <div className="jumbotron">
              <h1 className="display-4">Welcome to Bartendr!</h1>
              <p className="lead">The ultimate list of cocktail recipes</p>
            </div>
            <RecipeList recipes={this.props.recipes} />
          </div>
          <RecipeSidebar recipes={this.props.recipes} />    
        </div>
      <hr />
      <footer>
        <p>&copy; Bartendr 2017</p>
      </footer>
    </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired
};

const mapStateToProps = state => (
  { recipes: state.recipes }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators({ fetchRecipes }, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);