import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import NewPostPage from './Pages/NewPostPage';
import PostPage from './Pages/PostPage';
import EditPostPage from './Pages/EditPostPage';
import PostsPage from './Pages/PostsPage';
import Navgation from './Pages/Navgation';
import Error from './Pages/Error';

class App extends Component {
 
  render() {
    
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navgation/>
            <Switch> 
              <Route path='/' exact component={PostsPage} />
              <Route path='/view/:id' component={PostPage} />
              <Route path='/new' component={NewPostPage} />
              <Route path='/edit/:id' component={EditPostPage} />
              <Route  component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
 
export default App;