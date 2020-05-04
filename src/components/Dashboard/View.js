import React, {Component} from "react";
import EditSong from "../Edit/EditSong"; 
import "./View.css"


export default class View extends Component {
    constructor(props) {
        super(props)

        this.state = {
            edit: false
        }
    }
    
    toggleEdit = () => {
        let {edit} = this.state
        this.setState({
            edit: !edit
        })
    }

    render() {

        const {song, user, deleteSong, getSongs} = this.props 
        const {name, artist, title, requests, complete, form_id, user_id} = song
        const {is_admin, user_id: singer} = user 

        return (
            <div className="song-list">
                <div className="queue">
                {
                    is_admin
                    ?
                    <div>
                        <div className="test">
                            {name}
                        </div>

                        <div>
                            {artist}
                        </div>

                        <div>
                            {title}
                        </div>

                        <div>
                            {requests}
                        </div>

                        <div>
                            {complete ? "yes": "no"}
                        </div>
                        <button onClick={() => deleteSong(form_id)}>delete</button>
                    </div>
                    :
                    <div>
                        <div>
                            {name}
                        </div>

                        <div>
                            {artist}
                        </div>

                        <div>
                            {title}
                        </div>
                        
                        {
                            +singer === +user_id &&
                            <div>
                            <button onClick={() => deleteSong(form_id)}>delete</button>
                            <button onClick={() => this.toggleEdit()}>edit</button>
                            </div>
                        }
                
                        {
                            this.state.edit
                            &&
                            <EditSong
                            toggleEdit={this.toggleEdit}
                            song={song}
                            getSongs={getSongs}
                            /> 
                        }                            
                    </div>
                }
                </div>
                
            </div>
        )
    }

}