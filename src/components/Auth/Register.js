import React, { Component } from "react"; 
import {connect} from "react-redux"; 
import {register} from "../../redux/reducers/users"; 

class Register extends Component {
    constructor(props) {
        super(props)

       this.state = {
           name: "", 
           email: "", 
           password: "", 
           is_admin: false
       }
    }

    handleRegister = e => {
        e.preventDefault()
        this.props.register(this.state).then(() => {
            this.props.redirect()
        }).catch(err => {
            console.log("register error: ", err)
        })
    }

    handleChange = e => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    handleClick = () => {
        let {admin} = this.state
        this.setState({
            admin: !admin
        })
    }

    render() {
        let {admin} = this.state

        return (
            <div>
                <p>CREATE AN ACCOUNT</p> 
                <p>First off, who dis?</p>
                <form onSubmit={this.handleRegister}>
                    <span> 
                        <input
                            name="singer"
                            type="checkbox"
                            checked={!admin}
                            onChange={this.handleClick}
                        />
                        <label htmlFor="singer">Singer</label>
                    </span>
                    
                    <span> 
                        <input
                            name="dj"
                            type="checkbox"
                            checked={admin}
                            onChange={this.handleClick}
                        />
                        <label htmlFor="dj">DJ</label>
                    </span>
                    
                    <input
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="enter your name..."
                    />
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
                    <button>sign up</button>
                </form>

                <p>Already have an account?</p>
                <button onClick={this.props.toggle}>Sign in!</button>
            </div>
        )
    }
}

export default connect(null, {register})(Register)