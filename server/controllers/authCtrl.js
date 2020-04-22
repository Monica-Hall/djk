const bcrypt = require("bcrypt"); 

module.exports = {
    register: async (req, res) => {
        try {
            const db = req.app.get("db")
            let {name, email, password, is_admin} = req.body
            
            let users = await db.auth.find_user_by_email(email)
            let user = users[0]

            if(user) {
                return res.status(409).send('User already exists, please sign in.')
            }

            const salt = bcrypt.genSaltSync(12)
            const hash = bcrypt.hashSync(password, salt)

            let response = await db.auth.create_user({name, email, hash, is_admin})
            let newUser = response[0]

            delete newUser.password

            req.session.user = newUser
            res.send(req.session.user)

        } catch (error) {
            console.log("registering error: ", error)
            res.status(500).send(error)
        }
    }, 

    login: async (req, res) => {
        try {
            const db = req.app.get("db")
            let {email, password} = req.body

            let users = await db.auth.find_user_by_email(email)
            let user = users[0]

            if(!user) {
                return res.status(401).send("Could not find account, please try again.")
            }

            let isAuthenticated = bcrypt.compareSync(password, user.password)

            if(!isAuthenticated) {
                return res.status(401).send("User information is incorrect, please try again.")
            }

            delete user.password
            req.session.user = user 
            res.send(req.session.user)

        } catch (error) {
            console.log("login error: ", error)
            res.status(500).send(error)
        }
    }, 

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }, 
    
    getUser: (req, res) => {
        try {
            res.status(200).send(req.session.user)
        } catch (error) {
            console.log("error getting user: ", error)
            res.status(500).send(error)
        }
    }
}