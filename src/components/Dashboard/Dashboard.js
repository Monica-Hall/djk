import React, { Component } from "react"; 
import axios from "axios"; 
import {Redirect} from "react-router-dom"; 
import View from "./View"; 
import {connect} from "react-redux"; 

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

    editSong = form_id => {
        axios.put(`/api/edit_song/${form_id}`).then(({data}) => {
            this.setState({
                songs: data
            })
        }).catch(err => {
            console.log("error editing song:", err)
        })
    }

    render() {
        // console.log(this.props)
        let {redirect} = this.state

        //to add more songs 
        if(redirect) {
            return <Redirect to="/form"/>
        }

        const mappedSongs = this.state.songs.map(song => {
            return (
                <div key={song.form_id}>
                    <View 
                    song={song}
                    user={this.props.users.user}
                    deleteSong={this.deleteSong}/>
                </div>
            )
        })

        return (
            <div>
                <h3>up next...</h3> 
                {mappedSongs}
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps, null)(Dashboard)