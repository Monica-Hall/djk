import React, { Component } from "react"; 
import Login from "./Login"; 
import Register from "./Register"; 
import {Redirect} from "react-router-dom"; 
import "./Auth.css"; 

class Auth extends Component {
    constructor(props) {
        super(props)

        this.state = {
            display: true, 
            redirect: false
        }
    }

    toggleLogin = () => {
        let {display} = this.state

        this.setState({
            display: !display
        })
    }

    toggleRedirect = () => {
        let {redirect} = this.state

        this.setState({
            redirect: !redirect
        })
    }

    render() {
        const {display, redirect} = this.state

        if(redirect) {
            return <Redirect to="/dashboard"/>
        }

        return (
            <div className="auth-main">
                <h1>dj k</h1> 
                <h2>[ a r a o k e ]</h2>
                {
                    display
                    ?
                    <Login
                        toggle={this.toggleLogin}
                        redirect={this.toggleRedirect}
                    />
                    :
                    <Register
                        toggle={this.toggleLogin}
                        redirect={this.toggleRedirect}
                    />
                }
            </div>
        )
    }
}

export default Auth