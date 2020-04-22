//IMPORT DEPENDENCIES 
require("dotenv").config(); 
const express = require("express"); 
const session = require("express-session"); 
const massive = require("massive"); 

//IMPORT VARIABLES 
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env; 
const {register, login, logout, getUser} = require("./controllers/authCtrl");
const {createSong, updateSong, deleteSong, getSongs} = require("./controllers/songCtrl"); 
const {adminOnly} = require ("./middleware/adminOnly"); 

//TOP LEVEL 
const app = express(); 
app.use(express.json()); 
app.use(session({
    secret: SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}))

//MASSIVE
massive({
    connectionString: CONNECTION_STRING, 
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set("db", db)
    console.log("connected to db")
}).catch(err => console.log(err)); 

//ENDPOINTS - AUTHORIZATION
app.post("/auth/register", register); 
app.post("/auth/login", login); 
app.get("/auth/logout", logout);
app.get("/auth/get_user", getUser);  

//ENDPOINTS - FULL CRUD: GET, POST, PUT, DELETE
//AUTH
// app.get("/api/get_dj_songs", adminOnly, getSongs) // DISPLAYS QUEUE W DELETE OPTION
// app.delete("/api/delete_dj_song/:id", adminOnly, deleteSong) // DELETE FROM DISPLAY 

//USER
app.get("/api/get_songs", getSongs) // DISPLAYS QUEUE, NO DELETE OPTION
app.post("/api/add_song", createSong) // ADD SONG FROM FORM TO DISPLAY
app.put("/api/edit_song/:form_id", updateSong) // EDIT SONG FROM FORM BEFORE SUBMIT
app.delete("/api/delete_song/:form_id", deleteSong) // CANCEL REQUEST BEFORE SUBMIT

//SERVER LISTENING
app.listen(SERVER_PORT, console.log(`Listening on the best port in town, port ${SERVER_PORT}`)); 