import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// import NewPostPage from './Pages/NewUserPage';
import HomePage from './Pages/HomePage';
import GoogleAuth from './Pages/GoogleAuth';
import HookView from './Pages/HookView'; 
import UserView from './Pages/UserView'; 
import Navgation from './components/Navgation';
import Error from './Pages/Error'; 


class App extends Component {
 
  render() {
    
    return (
      <Provider store={store}>
       <div>
        <BrowserRouter>
          <div>
            <Navgation/>
            <Switch>  
              <Route exact path='/' component={HomePage} />
              <Route exact path='/user/view/:id' component={UserView} />
              <Route exact path='/new' component={GoogleAuth} />
              <Route exact path='/hook/:id' component={HookView} />
              <Route  component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
        </div>
      </Provider>
    );
  }
}
 
export default App;