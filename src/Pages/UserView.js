import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser, updateUser } from '../actions/postActions';
import HooksList from '../components/HooksList';


class UserView extends Component {

  constructor(){
    super();
    this.state = { 
      user:{},
      userId:''
    }
  }
  componentWillMount() {
    let userId = this.props.match.params.id;
    this.setState({userId:userId});
  }
  componentDidMount(props){
    let userId = this.props.match.params.id;
    this.props.fetchUser(userId);
  }

  componentWillReceiveProps(props){
    this.setState({user:props.post}, ()=>{
      // console.log('set Sate');
    });
  }


  updateDeviceData(element, e) {
    const { user } = this.state;
    user.devices[element.index][element.field] = e.target.value;
    if(element.field === 'data') {
      user.devices[element.index][element.field] = JSON.parse(e.target.value);
    }
    this.setState({user: user})
  }

  async handleSaveData(e) {
    e.preventDefault(); 
    const { user } = this.state;
    try {   
      let formData =  {
          devices: user.devices
      };     
      const updatedUser = await this.props.updateUser(formData, user._id);
      if(updatedUser.error) {
        throw (updatedUser.error);
      }
      window.location.reload(); 
    } catch (error) {
        console.log('error',error);
    }    
  }

  render() {
    let devicesList;
    const { user, userId } = this.state;
    let editurl = `/edit/${user._id}`;
    if(user.devices) {
      devicesList = user.devices.map((device, index)=> {
        const template = (
          <div  key={index}>
            <input type="text" onChange={this.updateDeviceData.bind(this, {field:'name', index:index})} defaultValue={device.name} placeholder="Name" /> <br/>
            <select onChange={this.updateDeviceData.bind(this, {field:'type', index:index})} defaultValue={device.type} >
              <option value="mobile">Mobile</option>
              <option value="pc">Computer</option>
              <option value="server">Server</option>
            </select> <br />
            <textarea onChange={this.updateDeviceData.bind(this, {field:`data`, index:index})} defaultValue={JSON.stringify(device.data)}></textarea> <br/>
            <hr/>
          </div>
        );
        return template;
      });
    }
    return (
      <div className="post-page">
        <form onSubmit={this.handleSaveData.bind(this)}>
          <h1>User : {user.fullName} <Link to={editurl}>Edit</Link></h1>
          <label> Full Name :{ user.fullName } </label><br/>
          <label> User Name :{ user.userName } </label><br/>
          <label> Email :{ user.email } </label><br/>
          <label> Password :{ user.password } </label><br/>
          { devicesList }
          <HooksList userId={userId} ></HooksList>
          <button type="submit">Save</button>
        </form>        
      </div>
    );
    
  }
}

// PostPage.propTypes = {
//   title: PropTypes.string.isRequired,
// };
const mapStateToprops = state => ({
  post: state.posts.item
})
export default connect( mapStateToprops, {fetchUser, updateUser })(UserView);