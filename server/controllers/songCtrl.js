module.exports = {
    createSong: async (req, res) => {
        try {
            const db = req.app.get("db")
            const {artist, title, requests} = req.body
            const {user_id} = req.session.user 

            const song = await db.songs.create_song({artist, title, requests, user_id})
            res.status(200).send(song)

        } catch (error) {
            console.log("error creating song", error)
            res.status(500).send("There was an error creating your song, please try again.")
        }
    }, 

    deleteSong: async (req, res) => {
        try {
            const db = req.app.get("db")
            const {form_id} = req.params 
            
            const song = await db.songs.delete_song({form_id}) 
            res.status(200).send(song)

        } catch (error) {
            console.log("error deleting song", error)
            res.status(500).send("There was an error deleting your song, please try again.")
        }
    }, 

    updateSong: async (req, res) => {
        try {
            const db = req.app.get("db")
            const {form_id} = req.params
            const {artist, title, requests} = req.body            

            const song = await db.songs.update_song({form_id, artist, title, requests})
            res.status(200).send(song)

        } catch (error) {
            console.log("error editing songs", error)
            res.status(500).send("There was an error editing your song, please try again.")
        }
    }, 

    getSongs: async (req, res) => {
        try {
            const db = req.app.get("db")
        
            const song = await db.songs.get_songs()
            res.status(200).send(song)

        } catch (error) {
            console.log("error getting song", error)
            res.status(500).send("There was an error getting your songs, please try again.")
        }
    }
}