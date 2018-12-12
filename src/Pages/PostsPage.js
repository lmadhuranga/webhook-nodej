import React, { Component } from 'react';   
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import { Link } from 'react-router-dom';

class PostsList extends Component {

  constructor(){
    super();
    this.state = { 
      posts:[]
    }
  }
  
  componentDidMount() {
    this.props.fetchPosts();
  }
  
  render() {
    console.log('this.props',this.state.posts);
    let postsItems = this.props.posts.map((post)=>{
      let url = `/view/${post.id}`;
      return <li key={post.id}> <Link to={url} > {post.title} </Link> </li>
    });

    return (
      <div className="PostsList">
        <h1>Post Collection</h1>
        <ul>
          {postsItems}
        </ul>
      </div>
    );
  }
}

// PostsList.propTypes = {
//   title: PropTypes.string.isRequired,
// };
const mapStateToprops = state => ({
  posts: state.posts.items
})
export default connect( mapStateToprops, { fetchPosts })(PostsList);