import React, { Component } from "react"; 
import {Redirect} from "react-router-dom"; 
import {createSong} from "../../redux/reducers/songs"; 
import { connect } from "react-redux";

class Form extends Component {
    constructor(props) {
        super(props)

        this.state = {
            artist: "", 
            title: "", 
            requests: "",
            redirect: false
        }
    }

    handleChange = (name, value) => {

        this.setState({
            [name]: value
        })
    }

    handleClick = (e) => {
        e.preventDefault()
        let {artist, title, requests} = this.state
        this.props.createSong({artist, title, requests})

        this.setState({
            artist: "", 
            title: "", 
            requests: ""
        })

        this.toggleRedirect()
    }

    toggleRedirect = () => {
        let {redirect} = this.state

        this.setState({
            redirect: !redirect
        })
    }

    render() {
        // console.log(this.props)
        const {redirect} = this.state

        if(redirect) {
            return <Redirect to="/dashboard"/>
        }

        return (
            <div>
                    {/* want a uniquie greeting, try this.props.users.user.name */}
                <p>Tell that funky DJ to put that record on.</p>
                <form onSubmit={this.handleClick}>
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
                        value={this.state.requests}
                        onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                        placeholder="Enter special request. Example: Play the remix version by so and so..."
                    />
                    <button>submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = {createSong}

export default connect(mapStateToProps, mapDispatchToProps)(Form)