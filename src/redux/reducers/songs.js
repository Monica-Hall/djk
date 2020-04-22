import axios from "axios"; 

const EDIT_SONG = "EDIT_SONG"; 
const DELETE_SONG = "DELETE_SONG"; 

const initialState = {
    data: null, 
    loading: false
}

export default function(state = initialState, action) {
    let {type, payload} = action

    switch(type) {

        //EDIT
        case EDIT_SONG + "_PENDING":
            return {
                ...state, 
                loading: true
            }
        case EDIT_SONG + "_FULFILLED": 
            return {
                ...state,
                data: payload.data, 
                loading: false
            }
        case EDIT_SONG + "_REJECTED": 
            return {
                ...state,
                loading: false
            }

        //DELETE
        case DELETE_SONG + "_PENDING":
            return {
                ...state, 
                loading: true
            }
        case DELETE_SONG + "_FULFILLED": 
            return {
                ...state,
                data: payload.data, 
                loading: false
            }
        case DELETE_SONG + "_REJECTED": 
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}

export function editSong(id) {
    return {
        type: "", 
        payload: axios.post("api/edit_song/:id", id)
    }
}

export function deleteSong(id) {
    return {
        type: "", 
        payload: axios.delete("/api/delete_song/:id", id)
    }
}