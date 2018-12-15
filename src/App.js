import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import NewPostPage from './Pages/NewUserPage';
import GoogleAuth from './Pages/GoogleAuth';
import HookView from './Pages/HookView'; 
import UserView from './Pages/UserView'; 
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
              <Route path='/view/:id' component={UserView} />
              <Route path='/new' component={GoogleAuth} />
              <Route path='/hook/:id' component={HookView} />
              {/* <Route path='/edit/:id' component={EditPostPage} /> */}
              <Route  component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
 
export default App;