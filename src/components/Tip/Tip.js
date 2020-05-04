import React, { Component } from "react"; 
import StripeCheckout from "react-stripe-checkout"; 
import stripe from '../../stripe';
import axios from "axios";
import "./Tip.css"
import {Link} from "react-router-dom"; 


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
            <div className="tip-page">
                <div>
                    <h1 className="black-header">show</h1>
                    <h1 className="green-header">dj k</h1>
                    <h1 className="black-header">some love</h1>
                </div>
                
                <div className="tip-button">    
                    <StripeCheckout 
                    label="Tip Me"
                    token={this.onToken}
                    stripeKey={stripe.publicKey}
                    amount={500}
                    />
                </div>

                <Link to="/dashboard">Who's up next</Link>

            </div>
            
        )
    }
}