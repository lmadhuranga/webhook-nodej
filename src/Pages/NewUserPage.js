import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect }  from 'react-redux';
import { registerUser } from '../actions/postActions';

import { Redirect } from 'react-router-dom';

class NewUserPage extends Component {

    constructor(){
        super(); 
        this.state = { 
            user: {},
            redirectToReferrer: false,
            toUrl: '/'
        }
    }

    async handleSaveData(e) {
        e.preventDefault();
        try {
            let formData =  {
                fullName:this.refs.fullName.value,
                userName:this.refs.userName.value,
                email:this.refs.email.value,
                password:this.refs.password.value,
            }; 
            const user = await this.props.registerUser(formData)
            if(user.error) {
                throw (user.error);
            }
            this.setState({toUrl: `/view/${user.data._id}`,  redirectToReferrer: true });
        } catch (error) {
            console.log('error',error);
        }
        
    }

    render(props) {
        const { toUrl } = this.state
        let { from } = this.props.location.state || { from: { pathname: toUrl } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;
 
        return (
            <div className="post-page">
                <h1>New User</h1>
                <form onSubmit={this.handleSaveData.bind(this)}>
                    <input type="text" ref="fullName" placeholder="FullName" /> <br/>
                    <input type="text" ref="userName" placeholder="User Name" /> <br/>
                    <input type="email" ref="email" placeholder="Email" /> <br/>
                    <input type="text" ref="password" placeholder="Password" /> <br/>
                    <button type="submit">Done</button>
                </form>
            </div>
        );
        
    }
}

// NewPostPage.propTypes = {
//   title: PropTypes.string.isRequired,
// };
 
export default connect( null, { registerUser })(NewUserPage);