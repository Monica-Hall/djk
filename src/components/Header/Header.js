import React, { Component } from "react"; 
import {connect} from "react-redux"; 
import {logout} from "../../redux/reducers/users"; 
import {Redirect} from "react-router-dom"; 

class Header extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            song: [], 
            redirect: false
        }
    }

    handleLogout = () => {
        this.props.logout().then(({data}) => {
            this.setState({
                songs: data, 
                redirect: true
            })
        }).catch(err => {
            console.log("logout error:", err)
        })
    }

    toggleRedirect = () => {
        let {redirect} = this.state

        this.setState({
            redirect: !redirect
        })
    }

    render() {
        const {redirect} = this.state

        if(redirect) {
            return <Redirect to="/"/>
        }

        return (
            <div>
                This is Header Component 
                {/* {
                    (this.props.loading)
                    ?
                    <div>
                        Loading...
                    </div>
                    :
                    <div>
                        may need to change users to user 
                        Welcome {this.props.users.name} 
                    </div>
                } */}

                <div>
                    {
                        this.props.users.user &&
                        <div>
                        <button onClick={this.handleLogout}>sign out</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state; 

export default connect(mapStateToProps, {logout})(Header)
// export default Header