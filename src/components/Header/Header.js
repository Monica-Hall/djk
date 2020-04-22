import React, { Component } from "react"; 
import {connect} from "react-redux"; 
import {getUser} from "../../redux/reducers/users"; 

class Header extends Component {
    
    componentDidMount() {
        this.props.getUser()
    }

    render() {
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
            </div>
        )
    }
}

const mapStateToProps = state => state; 

export default connect(mapStateToProps, {getUser})(Header)