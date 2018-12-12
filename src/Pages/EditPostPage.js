import React, { Component } from 'react';
import { connect } from 'react-redux';
 
import { Redirect } from 'react-router-dom';
import { updatePost, fetchPost } from '../actions/postActions';
 

class EditPostPage extends Component {

    constructor(){
        super(); 
        this.state = { 
            post: {
                title:'',
                completed: false
            },
            redirectToReferrer: false
        }

        this.handleInput = this.handleInput.bind(this)
    }

    handleInput(event){
        event.preventDefault();
        let name = event.target.name;
        let value = event.target.value; 
        this.setState( prevState => ({ 
            post : { ...prevState.post, [name]: value }
        }));
    }

    handleSaveData(e) {
        let postId = this.props.match.params.id;
        e.preventDefault();
        this.props.updatePost(postId, this.state.post)
        this.setState({ redirectToReferrer: true });
    }

    componentDidMount(){
        let postId = this.props.match.params.id;
        this.props.fetchPost(postId)
    }

    componentWillReceiveProps(props) {
        this.setState({post:props.post})
    }
    render(props) { 
        let { from } = this.props.location.state || { from: { pathname: "/" } };
        let { redirectToReferrer } = this.state;

        if (redirectToReferrer) return <Redirect to={from} />;

        return (
            <div className="post-page">
                <h1>Update {this.state.post.title} Post</h1>
                <form onSubmit={this.handleSaveData.bind(this)}>
                    <input type="text" ref="title" defaultValue={this.state.post.title} name="title" placeholder="Title" onChange={this.handleInput}/> <br/>
                    <textarea cols='60' ref="body" defaultValue={this.state.post.body} name="body" placeholder="Content" onChange={this.handleInput}/> <br/>                     
                    <button type="submit">Save </button>
                </form>
            </div>
        );
        
    }
} 
const mapStateToprops = state => ({
    post: state.posts.item
})
export default connect( mapStateToprops, { updatePost, fetchPost })(EditPostPage);