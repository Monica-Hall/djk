import React, { Component } from "react"; 
import {connect} from "react-redux"; 
import {login} from "../../redux/reducers/users"; 

class Login extends Component {
    constructor(props) {
        super(props)

       this.state = {
           email: "", 
           password: ""
       }
    }

    handleLogin = e => {
        e.preventDefault()
        this.props.login(this.state).then(() => {
            this.props.redirect()
        }).catch(err => {
            console.log("login error: ", err)
        })
    }

    handleChange = e => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleLogin}>
                    <input
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="enter your email..."
                    />

                    <input
                        name="password"
                        type="text"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="enter your password..."
                    />

                    <button>sign in</button>
                </form> 

                <p>Don't have an account?</p>
                <button onClick={this.props.toggle}>Sign up!</button>
            </div>
        )
    }
}

export default connect(null, {login})(Login)