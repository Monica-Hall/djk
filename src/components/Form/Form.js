import React, { Component } from "react"; 
import {Redirect, Link} from "react-router-dom"; 
import {createSong} from "../../redux/reducers/songs"; 
import { connect } from "react-redux";
import "./Form.css"

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
        const {redirect} = this.state

        if(redirect) {
            return <Redirect to="/dashboard"/>
        }

        return (
            <div className="form-main">
                    {/* want a uniquie greeting, try this.props.users.user.name */}
                <p className="top-header">TELL THAT FUNKY DJ</p>
                <p className="bottom-header">TO PUT THAT RECORD ON</p>

                <form onSubmit={this.handleClick} className="song-form">

                    <div>
                    <h4>ADD A SONG</h4>
                        <label htmlFor="artist name">artist name:</label>
                        <input className="artist-input"
                            name="artist"
                            type="text"
                            value={this.state.artist}
                            onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                            placeholder="enter artist name..."
                        />
                    </div>

                    <div>
                        <label htmlFor="song title">song title:</label>
                        <input className="song-input"
                            name="title"
                            type="text"
                            value={this.state.title}
                            onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                            placeholder="enter song title..."
                        />
                    </div>

                    <div>
                    <label htmlFor="requests">special requests:</label>
                    <input className="special-input"
                        name="requests"
                        type="text"
                        value={this.state.requests}
                        onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                        placeholder="Enter special request... 'Play the remix version by so and so...'"
                    />
                    </div>
                    
                        <button>submit</button>
                </form>

                <ul>
                    <Link to="/dashboard">Who's up next</Link>
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => state

const mapDispatchToProps = {createSong}

export default connect(mapStateToProps, mapDispatchToProps)(Form)