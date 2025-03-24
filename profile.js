import React, { Component } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './profile.css';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { api_url } from '../config';
import Home from '../Home/home';
import axios from 'axios';

class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            data: {
                userData: null,
                posts: [],
            }
        }
    }


    componentDidMount() {
        // user_name=${JSON.parse(sessionStorage.getItem('username'))}
        axios.get(`${api_url}/users/get_user?user_name=${JSON.parse(sessionStorage.getItem('username'))}`)
            .then(res => {
                this.setState({
                    isLoading: false,
                    data: res.data
                })
            }).catch(err => {
                alert('Failed to get user profile')
            });
    }
    render() {
        if (this.state.isLoading) {
            return (
                <div className="row">
                    <div className="col-12 text-center mt-5">
                        <div class="spinner-border text-warning" role="status">
                            <span class="sr-only"></span>
                        </div>
                    </div>
                </div>

            )
        }
        const userData = this.state.data?.user_data ? this.state.data.user_data[0] : null;
        const posts = this.state.data?.user_posts ? this.state.data.user_posts : [];
        if (userData) {
            return (
                <div className='profile-page hideScroll'>
                    <div className='profile-holder mb-3'>
                        <div className='profile'>
                            <AccountCircleIcon style={{ fontSize: 150, color: "rgb(255, 255, 200)" }} />
                            <br />
                            <button type='button' className='btn' onclick={this.handleUpdateProfile}>Update</button>
                        </div>
                        <div className='details'>
                            <table border='0' style={{ width: '400px' }}>
                                <tr>
                                    <th>Name:</th>
                                    <td>{userData.user_name}</td>
                                </tr>
                                <tr>
                                    <th>Email:</th>
                                    <td>{userData.email}</td>
                                </tr>
                                <tr>
                                    <th>Company:</th>
                                    <td>{userData.current_company}</td>
                                </tr>
                                <tr>
                                    <th>Reg.No:</th>
                                    <td>{userData.roll_no}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    {/* for posts */}
                    {posts &&
                        <Home fromProfile={true} postsData={posts} />
                    }
                </div>
            )
        } else {
            return null;
        }
    }
}
export default Profile;