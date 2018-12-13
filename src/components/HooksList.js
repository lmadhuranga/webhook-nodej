import React, { Component } from 'react';   
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchHooks } from '../actions/hookActions';
import { Link } from 'react-router-dom';

class HooksList extends Component {

  constructor(){
    super();
    this.state = {}
  }
  
  componentDidMount() {
    // console.log('this.props',this.props);
    // let userId = this.props.match.params.id;
    this.props.fetchHooks('5c1115168a9b721b003e5b0f');
  }
  
  render() {
    const { hooks } = this.props;
    let hookItems = hooks.map((hook)=> {
      let url = `/hook/${hook._id}`;
      return <li key={hook._id}> <Link to={url} > {hook.name} </Link> </li>
    });

    return (
      <div className="HooksList">
        <h1>Hooks Collection</h1>
        <ul>
          { hookItems }
        </ul>
      </div>
    );
  }
}

// Hooks.propTypes = {
//   title: PropTypes.string.isRequired,
// };
const mapStateToprops = state => ({
  hooks: state.hooks.items
})
export default connect( mapStateToprops, { fetchHooks })(HooksList);