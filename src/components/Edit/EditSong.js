import React, { Component } from "react"; 
import {editSong} from "../../redux/reducers/songs"
import {connect} from "react-redux"

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
        // console.log(this.songs)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                            name="title"
                            type="text"
                            value={this.state.title}
                            onChange={(e) => this.handleChange(e.target.name, e.target.value)}
                            placeholder="enter song title..."
                        />
                        <button>save</button>
                </form>
                <button onClick={this.props.toggleEdit}>cancel</button>
            </div>
        )
    }
}

export default connect(null, {editSong})(EditSong)