import axios from "axios"; 

const REGISTER_USER = "REGISTER_USER"; 
const LOGIN_USER = "LOGIN_USER"; 
const LOGOUT_USER = "LOGOUT_USER"; 

const initialState = {
    data: null, 
    loading: false
}

export default function(state = initialState, action) {
    let {type, payload} = action

    switch(type) {

        //REGISTER
        case REGISTER_USER + "_PENDING":
            return {
                ...state, 
                loading: true
            }
        case REGISTER_USER + "_FULFILLED": 
            return {
                ...state,
                data: payload.data, 
                loading: false
            }
        case REGISTER_USER + "_REJECTED": 
            return {
                ...state,
                loading: false
            }
        
        // LOGIN
        case LOGIN_USER + "_PENDING": 
            return {
                ...state,
                loading: true
            }
        case LOGIN_USER + "_FULFILLED": 
            return {
                ...state,
                data: payload.data, 
                loading: false
            }
        case LOGIN_USER + "_REJECTED": 
            return {
                ...state,
                loading: false
            }

        //LOGOUT
        case LOGOUT_USER + "_PENDING": 
            return {
                ...state,
                loading: true
            }
        case LOGOUT_USER + "_FULFILLED": 
            return {
                ...state,
                data: null, 
                loading: false
            }
        case LOGOUT_USER + "_REJECTED": 
            return {
                ...state,
                loading: false
            }
        
        default:
            return state
    }
}

export function register(userInfo) { // when passing the params to the component, we will be calling from req.body
    return {
        type: REGISTER_USER, 
        payload: axios.post("/auth/register", userInfo)
    }
} 

export function login(userInfo) { // same as above 
    return {
        type: LOGIN_USER, 
        payload: axios.post("/auth/login", userInfo)
    }
}

export function logout() {
    return {
        type: LOGOUT_USER, 
        payload: axios.delete("/auth/logout")
    }
}
