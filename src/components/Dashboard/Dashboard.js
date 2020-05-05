import React, { Component } from "react"; 
import axios from "axios"; 
import View from "./View";
import {connect} from "react-redux"; 
import { Redirect, Link } from "react-router-dom"; 
import { logout } from "../../redux/reducers/users"; 
import "./Dashboard.css" 

class Dashboard extends Component {
    constructor(props) {
        super(props)

       this.state = {
           user: {}, 
           songs: [], 
           redirect: false
       }
    }

    componentDidMount() {
        this.getSongs()
    }

    getSongs = () => {
        axios.get("/api/get_songs").then(({data}) => {
            this.setState({
                songs: data
            })
        }).catch(err => {
            console.log("error getting tickets:", err)
        })
    }

    deleteSong = form_id => {
        axios.delete(`/api/delete_song/${form_id}`).then(({data}) => {
            this.setState({
                songs: data
            })
        }).catch(err => {
            console.log("error deleting song:", err)
        })
    }

    handleLogout = () => {
        this.props.logout().then(({data}) => {

            this.setState({
                redirect: true
            })
        }).catch(err => {
            console.log("logout error:", err)
        })
    }

    render() {

        const {user} = this.props.users

        const {redirect} = this.state

        if(redirect) {
            return <Redirect to="/"/>
        }

        const mappedSongs = this.state.songs.map(song => {
            return (
                <div key={song.form_id}>
                    <View 
                    song={song}
                    user={user}
                    deleteSong={this.deleteSong}
                    getSongs={this.getSongs}
                    />
                </div>
            )
        })


        return (
            <div className="dash-main">
                <div>
                    <h3 className="dash-header">up next...</h3> 
                </div>

                <div className="queue-header">
                    <p>FEATURING</p>
                    <p>ARTIST</p>
                    <p>SONG</p>
                </div>
                
                <div>
                    {
                        user 
                        &&
                        <div>
                            {mappedSongs}
                            <button className="sign-out" onClick={() => this.handleLogout()}>sign out</button>
                        </div>
                    }
                </div>
                
                <div>
                    <ul>
                        <Link to="/form">Got liquid courage? Add a song</Link>
                    </ul>

                    <ul>
                        <Link to="/payment">Tip the DJ</Link>
                    </ul>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, {logout})(Dashboard)