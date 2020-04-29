import React, { Component } from "react"; 
import StripeCheckout from "react-stripe-checkout"; 
import stripe from '../../stripe';
import axios from "axios";

export default class Tip extends Component {

    onToken = async(token) => {
        token.card = void 0; 
    
        await axios.post("/api/payment", {token, amount: 500})
        .then(() => {
            alert("Tip Submitted")
        })
        .catch(err => console.log(err))
    }
    render(){
        return(
            <div>
                <StripeCheckout 
                label="Show the DJ Some Love"
                token={this.onToken}
                stripeKey={stripe.publicKey}
                amount={500}
                />
            </div>
        )
    }
}