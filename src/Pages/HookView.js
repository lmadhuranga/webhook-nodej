import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { fetchHook, updateHook } from '../actions/hookActions';


class HookView extends Component {

  constructor(){
    super();
    this.state = { 
      hook:{},
      hookId:''
    }
  }
  componentWillMount() {
    let hookId = this.props.match.params.id;
    this.setState({hookId:hookId});
  }
  componentDidMount(){
    let hookId = this.props.match.params.id;
    this.props.fetchHook(hookId);
  }

  componentWillReceiveProps(props){
    const { hook } = props;
    this.setState({ hook });
  }

  updateStateByInput(field, e) {
    const { hook } = this.state;
    hook[field] = e.target.value;
    this.setState({hook});
  }

  upDateDisplay(type, e) {
    const { hook } = this.state;
    hook.displayFormat[type] = e.target.value;
    this.setState({hook});
  }

  upDateParams(e) {
    let { hook } = this.state;
    hook.params = e.target.value.split(',');
    this.setState({ hook });
  }
  
  async handleSaveData(e) {
    e.preventDefault(); 
    const { hookId, hook } = this.state;
    console.log('hook',hook); 
    try {
      const updatedUser = await this.props.updateHook(hook, hookId);
      if(updatedUser.error) {
        throw (updatedUser.error);
      }
      window.location.reload(); 
    } catch (error) {
        console.log('error',error);
    }    
  }

  render() {
    let content;
    const { hook } = this.state; 
    if(hook.hasOwnProperty('displayFormat')){
      content = <div>
            <li>displayFormat.title : <input defaultValue={hook.displayFormat.title} onChange={this.upDateDisplay.bind(this, 'title')} /></li>
            <li>displayFormat.body : <input defaultValue={hook.displayFormat.body} onChange={this.upDateDisplay.bind(this, 'body')} /></li>
            <li>params : <input onChange={this.upDateParams.bind(this)} defaultValue={hook.params.join(',')} /></li>
          </div>
    }
    return (
      <div className="hook-view-page">
        <h1>Hook view Page</h1>
        <form onSubmit={this.handleSaveData.bind(this)}>
        <ul>
          <li>Id : {hook._id}</li>
          <li>User : <a href={`/view/${hook.userId}`}>{hook.userId}</a></li>
          <li>Name : <input ref="name" onChange={this.updateStateByInput.bind(this, "name")} defaultValue={hook.name} /></li>
          <li>token : <input ref="token" onChange={this.updateStateByInput.bind(this, "token")} defaultValue={hook.token} /></li>
          <li>active : 
            <select  onChange={this.updateStateByInput.bind(this, "active")} ref="active" defaultChecked={hook.active}>
              <option value="active">Active</option>
              <option value="deactive">Deactive</option>
            </select>
          </li>
          { content }
          <li>createdAt : {hook.createdAt}</li>
          <button type="submit">Save</button>
        </ul>
        </form>
      </div>
    );
    
  }
}

// PostPage.propTypes = {
//   title: PropTypes.string.isRequired,
// };
const mapStateToprops = state => ({
  hook: state.hooks.item
})
export default connect( mapStateToprops, { fetchHook, updateHook })(HookView);