import React from 'react';
import { api_url } from '../config';
import {
    Link
} from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from '../../ActionCreator';
import {withRouter} from 'react-router'

class NavBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false
        }
    }

    // componentDidUpdate(prevProps){

    //     if(this.props.loggedIn !== prevProps.loggedIn){

    //         this.setState({
    //             loggedIn: this.props.loggedIn
    //         })
    //     }
    // }

    handleLogout = () => {
        this.props.handleLogout();
    }


    render() {
        const loggedIn = JSON.parse(sessionStorage.getItem('loggedin'))
        return (
            <div className='menuItems'>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    {(!loggedIn ) &&
                        <>
                            <li>
                                <Link to='/Login'>Login</Link>
                            </li>
                            <li>
                                <Link to='/Signup'>Signup</Link>
                            </li>
                        </>
                    }
                    {(loggedIn)&&
                        <>
                            <li>
                                <Link to='/Profile'>Profile</Link>
                            </li>
                            <li>
                                <Link to='/CreatePost'>Add Post</Link>
                            </li>
                            <li>
                                <Link onClick={this.handleLogout}>logout</Link>
                            </li>
                        </>
                    }
                </ul>

            </div>
        )
    }

}

export const mapDispatchToProps = (dispatch, ownProps) => ({
    handleLogout: () => {
        dispatch(Actions.handleLogout(ownProps));
    },
})
export const mapStateToProps = (state) => ({
    loggedIn: state.MainReducer.loggedIn,
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));