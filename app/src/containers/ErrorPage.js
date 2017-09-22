import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { clearError } from '../actions/errorActions';

class ErrorPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: props.error
    };
  }

  componentWillUnmount() {
    this.props.actions.clearError();
  }

  render() {
    const { code, statusText, error } = this.state.error;
    return (
      <div className="container">
        <h1>{`${code}: ${statusText}`}</h1>
        <h6>{error}</h6>
      </div>
    );
  }
}

ErrorPage.propTypes = {
  actions: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  { error: state.error }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators({ clearError }, dispatch) }
);

export default connect(null, mapDispatchToProps)(ErrorPage);