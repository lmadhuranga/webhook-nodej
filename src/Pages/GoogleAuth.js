import React, { Component } from 'react'; 
import { Redirect } from 'react-router-dom';

class GoogleAuth extends Component {
    render(props) {
        window.location = "http://localhost:3001/auth/google";
        return <Redirect to={'http://localhost:3001/auth/google'} />;       
    }
}
 
export default GoogleAuth