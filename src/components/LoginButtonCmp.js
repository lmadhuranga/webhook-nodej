import React, { Component } from 'react';   
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../actions/userActions';

class LoginButtonCmp extends Component {

  constructor(){
    super();
    this.state = {}
  }
  
  componentDidMount() {
    this.props.fetchCurrentUser();
  }
  
  render() {
    const { auth } = this.props;
    let buttons = <a href="/auth/logout">Log out</a>;
    if(!auth) {
      buttons =  <a href="/auth/google">Google sign in</a>;
    }
    return buttons;
  }
}

// Hooks.propTypes = {
//   title: PropTypes.string.isRequired,
// };
const mapStateToprops = state => ({
  auth: state.auth
})
export default connect( mapStateToprops, { fetchCurrentUser })(LoginButtonCmp);