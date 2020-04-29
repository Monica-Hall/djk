//IMPORT DEPENDENCIES 
require("dotenv").config(); 
const express = require("express"); 
const session = require("express-session"); 
const massive = require("massive"); 

//IMPORT VARIABLES 
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env; 
const {register, login, logout} = require("./controllers/authCtrl");
const {createSong, editSong, deleteSong, getSongs} = require("./controllers/songCtrl"); 
// const {adminOnly} = require ("./middleware/adminOnly"); 

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
app.delete("/auth/logout", logout);
// app.get("/auth/get_user", getUser);  

//ENDPOINTS - FULL CRUD: GET, POST, PUT, DELETE
app.get("/api/get_songs", getSongs) // returns all songs placed in queue (dashboard)
app.post("/api/add_song", createSong) // add a song to be placed in queue
app.put("/api/edit/:form_id", editSong) // edit the title of the song 
app.delete("/api/delete_song/:form_id", deleteSong) // delete the song from queue 

//SERVER LISTENING
app.listen(SERVER_PORT, console.log(`Listening on the best port in town, port ${SERVER_PORT}`)); 