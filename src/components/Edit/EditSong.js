import React, { Component } from "react"; 
import {editSong} from "../../redux/reducers/songs"
import {connect} from "react-redux"
import "./Edit.css"

class EditSong extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: ""
        }
    }

    componentDidMount() {
        let {title} = this.props.song
        this.setState({
            title
        })
    }

    handleChange = (name, value) => {
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let {title} = this.state
        this.props.editSong(this.props.song.form_id, {title}).then(() => {
            this.props.toggleEdit()
            this.props.getSongs()
        }).catch(err => console.log("edit:", err))
    }


    render() {
        return (
            <div className="edit-form">
                <form onSubmit={this.handleSubmit}>
                    <input className="edit-song"
                            name="title"
                            type="text"
                            value={this.state.title}
                            onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                            placeholder="enter song title..."
                        />
                        <button className="edit-option">save</button>
                </form>
                <button className="edit-option" onClick={this.props.toggleEdit}>cancel</button>
            </div>
        )
    }
}

export default connect(null, {editSong})(EditSong)