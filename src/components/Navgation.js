import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import LoginButtonCmp from './LoginButtonCmp';
import { connect } from 'react-redux';


class Navgation extends Component {
  
  render() {
    const { auth } = this.props;
    let Urllist = '';
    if( auth ) {
        
      Urllist  = <span>
            <NavLink to={`/user/view/${auth._id}`}>User View</NavLink> &nbsp;|&nbsp;
            <NavLink to={`/hooks/user/${auth._id}`}>Hooks</NavLink> &nbsp;|&nbsp;
          </span>
    }
    return (
      <div className="hunter">
        <NavLink to="/">Home</NavLink> &nbsp;|&nbsp;
        { Urllist }
        <LoginButtonCmp></LoginButtonCmp>
      </div>
    );
    
  }
}

const mapStateToprops = state => ({
  auth:state.auth
});

export default connect(mapStateToprops,{})(Navgation);