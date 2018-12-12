import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect }  from 'react-redux';
import { createPost } from '../actions/postActions';

import { Redirect } from 'react-router-dom';

class NewPostPage extends Component {

    constructor(){
        super(); 
        this.state = { 
            post: {},
            redirectToReferrer: false
        }
    }

    handleSaveData(e) {
        e.preventDefault();
        let formData =  {
            title:this.refs.title.value,
            body:this.refs.body.value,
        };
        this.props.createPost(formData);
        this.setState({ redirectToReferrer: true });
    }

    render(props) { 
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;
 
        return (
            <div className="post-page">
                <h1>New Post</h1>
                <form onSubmit={this.handleSaveData.bind(this)}>
                    <input type="text" ref="title" placeholder="Title" /> <br/>
                    <textarea cols='60' ref="body" value={this.state.post.body} name="body" placeholder="Content" onChange={this.handleInput}/> <br/>                    
                    <button type="submit">Done</button>
                </form>
            </div>
        );
        
    }
}

// NewPostPage.propTypes = {
//   title: PropTypes.string.isRequired,
// };
 
export default connect( null, { createPost })(NewPostPage);