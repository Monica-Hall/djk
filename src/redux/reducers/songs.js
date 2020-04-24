import axios from "axios"; 

const EDIT_SONG = "EDIT_SONG"; 
const DELETE_SONG = "DELETE_SONG"; 
const CREATE_SONG = "CREATE_SONG"; 

const initialState = {
    data: null, 
    loading: false
}

export default function reducer(state = initialState, action) {
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

        //CREATE
        case CREATE_SONG + "_PENDING":
            return {
                ...state, 
                loading: true
            }
        case CREATE_SONG + "_FULFILLED": 
            return {
                ...state,
                data: payload.data, 
                loading: false
            }
        case CREATE_SONG + "_REJECTED": 
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}


export function editSong(id, body) {
    return {
        type: EDIT_SONG, 
        payload: axios.post(`api/edit_song/${id}`, body)
    }
}

export function deleteSong(id) {
    return {
        type: DELETE_SONG, 
        payload: axios.delete(`/api/delete_song/${id}`)
    }
}

export function createSong(body) {
    return {
        type: CREATE_SONG, 
        payload: axios.post("/api/add_song", body)
    }
}