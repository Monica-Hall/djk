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
            <div className="register-container">
                <h3>CREATE AN ACCOUNT</h3> 
                <p>First off, who dis?</p>
                <form onSubmit={this.handleRegister} className="register-form">
                    <span> 
                        <input
                            name="singer"
                            type="checkbox"
                            checked={!admin}
                            onChange={this.handleClick}
                        />
                        <label htmlFor="singer">singer</label>
                    </span>
                    
                    <span className="checkbox"> 
                        <input
                            name="dj"
                            type="checkbox"
                            checked={admin}
                            onChange={this.handleClick}
                        />
                        <label htmlFor="dj">dj</label>
                    </span>
                    
                    <label htmlFor="name">name: </label>

                    <input
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="enter your name..."
                    />

                    <label htmlFor="email">email: </label>
                    <input
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="enter your email..."
                    />
                    
                    <label htmlFor="password">password: </label>
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
                <button onClick={this.props.toggle}>sign in</button>
            </div>
        )
    }
}

export default connect(null, {register})(Register)