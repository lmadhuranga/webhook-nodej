import React, { Component } from 'react';   
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchLogs } from '../actions/logActions';
// import { Link } from 'react-router-dom';

class LogsListCmp extends Component {

  constructor(){
    super();
    this.state = {}
  }
  
  componentDidMount() {
    let token = this.props.token;
    this.props.fetchLogs(token);
  }
  
  componentWillReceiveProps(prop) {
    this.setState({logs:this.props.logs})
  }

  formatMsg(params, formater, data) { 
    const replaceTxt = params.join('|');
    const newReg = new RegExp(replaceTxt,"gi");
    const newContent = formater.replace(newReg,(x)=>{
      const param = x.slice(1, x.length);
      return data[param];
    });
    return newContent;
  }

  render() {
    const { logs, params, displayFormat } = this.props;    
    const logItems = logs.map((log) => {
      const newTitle = this.formatMsg(params, displayFormat.title, log.data);
      const newBody = this.formatMsg(params, displayFormat.body, log.data);
      return <li key={log._id}> {newTitle} => {newBody}</li>
    });

    return (
      <div className="LogsListCmp">
        <h1>Hooks Collection</h1>
        <ul>
          { logItems }
        </ul>
      </div>
    );
  }
}

// Hooks.propTypes = {
//   title: PropTypes.string.isRequired,
// };
const mapStateToprops = state => ({
  logs: state.logs.items
})
export default connect( mapStateToprops, { fetchLogs })(LogsListCmp);