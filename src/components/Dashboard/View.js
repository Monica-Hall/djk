import React, {Component} from "react";
import EditSong from "../Edit/EditSong";  

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
            <div>
                {
                    is_admin
                    ?
                    <div>
                        {name}
                        {artist}
                        {title}
                        {requests}
                        {complete ? "yes": "no"}
                        <button onClick={() => deleteSong(form_id)}>delete</button>
                    </div>
                    :
                    <div>
                        {name}
                        {artist}
                        {title}
                        
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
        )
    }

}