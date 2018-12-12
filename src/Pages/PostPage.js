import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost } from '../actions/postActions';


class PostPage extends Component {

  constructor(){
    super();
    this.state = { 
      post:{}
    }
  }

  componentDidMount(props){
    let postId = this.props.match.params.id;
    this.props.fetchPost(postId);    
  }

  componentWillReceiveProps(props){
    this.setState({post:props.post});
  }

  render() { 
     let editurl = `/edit/${this.state.post.id}`;
     console.log('this.state',this.state);
    return (
      <div className="post-page">
        <h1>Post : {this.state.post.title} <Link to={editurl}>Edit</Link></h1>
        <p>{this.state.post.body}</p>
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
export default connect( mapStateToprops, { fetchPost })(PostPage);