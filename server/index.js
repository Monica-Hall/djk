//IMPORT DEPENDENCIES 
require("dotenv").config(); 
const express = require("express"); 
const session = require("express-session"); 
const massive = require("massive"); 


//IMPORT VARIABLES 
const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env; 
const {register, login, logout} = require("./controllers/authCtrl");
const {createSong, editSong, deleteSong, getSongs} = require("./controllers/songCtrl"); 
const {completePayment} = require("./controllers/tipCtrl"); 


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


//ENDPOINTS - FULL CRUD: GET, POST, PUT, DELETE
    // returns all songs placed in queue (dashboard)
app.get("/api/get_songs", getSongs) 
    // add a song to be placed in queue
app.post("/api/add_song", createSong) 
    // edit the title of the song 
app.put("/api/edit/:form_id", editSong) 
    // delete the song from queue 
app.delete("/api/delete_song/:form_id", deleteSong) 


//ENDPOINT - PAYMENT, STRIPE
app.post("/api/payment", completePayment)


//SERVER LISTENING
app.listen(SERVER_PORT, console.log(`Listening on the best port in town, port ${SERVER_PORT}`)); 