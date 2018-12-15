import React, { Component } from 'react'; 
import { Redirect } from 'react-router-dom';

class GoogleAuth extends Component {
    render(props) {
        return <Redirect to={'http://localhost:3001/auth/google'} />;       
    }
}
 
export default GoogleAuth