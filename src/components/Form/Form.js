import React, { Component } from "react"; 
import {Redirect} from "react-router-dom"; 


//link the submit button to dash
    // idea: toggle redirect function from auth component 
        // creat an if statement 

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            artist: "", 
            title: "", 
            requests: ""
        }
    }

    handleChange = (name, value) => {

        this.setState({
            [name]: value
        })
    }

    handleClick = () => {
        let {artist, title, requests} = this.state
        this.props.createSong({artist, title, requests})

        this.setState({
            artist: "", 
            title: "", 
            requests: ""
        })
    }

    toggleRedirect = () => {
        let {redirect} = this.state

        this.setState({
            redirect: !redirect
        })
    }

    render() {

        const {redirect} = this.state

        if(redirect) {
            return <Redirect to="/dash"/>
        }

        return (
            <div>
                    {/* want a uniquie greeting, tried this.props.user.name, this.props.users.name */}
                <p>Tell that funky DJ to put that record on.</p>
                <form onSubmit={this.handleChange}>
                    <input
                        name="artist"
                        type="text"
                        value={this.state.artist}
                        onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                        placeholder="enter artist name..."
                    />

                    <input
                        name="title"
                        type="text"
                        value={this.state.title}
                        onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                        placeholder="enter song title..."
                    />

                    <input
                        name="requests"
                        type="text"
                        value={this.state.password}
                        onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                        placeholder="Enter special request here. Example: Play the remix version by so and so..."
                    />
                    <button 
                    onClick={this.handleClick} 
                    redirect={this.toggleRedirect}
                    >submit</button>
                </form>
            </div>
        )
    }
}

export default Form