const {SECRET_KEY} = process.env; 
const stripe = require("stripe")(SECRET_KEY); 

module.exports = {
    completePayment: (req, res) => {
        const {token, amount} = req.body; 

        const charge = stripe.charges.create({
            amount, 
            currency:"USD", 
            source: token.id, 
            description: "Just the tip"
        }, function(err, charge) {
            if(err) {
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        })
    }
}