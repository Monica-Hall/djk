// import React, { Component } from "react"; 
// import Form from "./Form/Form"; 
// import Dashboard from "./Dashboard/Dashboard"; 
// import { Redirect } from "react-router-dom"; 

// export default class Viewpoint extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             display: true, 
//             redirect: false
//         }
//     }

//     toggleForm = () => {
//         let {display} = this.state

//         this.setState({
//             display: !display
//         })
//     }

//     toggleRedirect = () => {
//         let {redirect} = this.state

//         this.setState({
//             redirect: !redirect
//         })
//     }

//     render() {

//         const {display, redirect} = this.state

//         if(redirect) {
//             return <Redirect to="/dash"/>
//         }

//         return (
//             <div>
//                 {
//                     display
//                     ?
//                     <Form
//                     toggle={this.toggleForm}
//                     redirect={this.toggleRedirect}/>
//                     :
//                     <Dashboard
//                     toggle={this.toggleForm}
//                     redirect={this.toggleRedirect}/>
//                 }

//             </div>
//         )
//     }
// }