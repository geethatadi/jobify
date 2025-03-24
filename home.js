import React, { Component } from 'react';
import './home.css';
import InterviewInfo from '../InterviewInfo/InterviewInfo';
import { api_url } from "../config";
import { withRouter } from 'react-router';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            myData: [],
        }
    }
    onNavigateExperience(post_id) {
        this.props.history.push({
            pathname: `/InterviewInfo/${post_id}`,
        });
    }

    componentDidUpdate(prevProps) {
        if ((this.props.location.fromSearch !== prevProps.location.fromSearch) || (this.props.location.fromLogOut !== prevProps.location.fromLogOut) ||
            (this.props.location.input !== prevProps.location.input)) {
            this.setState({
                isLoading: false,
                myData: this.props.location.state,
            });
        }
    }

    handleGetAllComments = () => {
        axios.get(`${api_url}/post/get_all_posts`)
            .then(res => {
                // alert('before login');
                this.setState({
                    isLoading: false,
                    myData: res.data
                })
            }).catch(err => {
                console.log('Failed to get data before login');
            });
    }

    componentDidMount() {
        if (this.props.location?.fromSearch) {
            this.setState({
                isLoading: false,
                myData: this.props.location.state,
            });
        } else if (this.props.fromProfile) {
            this.setState({
                isLoading: false,
                myData: this.props.postsData
            });
        } else if(JSON.parse(sessionStorage.getItem('loggedin'))) {
            axios.get(`${api_url}/post/get_user_interested_posts?user_name=${JSON.parse(sessionStorage.getItem('username'))}`)
                .then(res => {
                    this.setState({
                        isLoading: false,
                        myData: res.data
                    })
                }).catch(err => {
                    console.log('Failed to get data on login');
                });
        } else {
            this.handleGetAllComments()
        }
    }
    handleDeletePost = (post_id) => {
        // const r = confirm('Are you sure? Delete the post');
        // if (r == true) {}
        alert('are you sure');
        axios.get(`${api_url}/post/delete_post?post_id=${post_id}`)
            .then(res => {
                axios.get(`${api_url}/users/get_user?user_name=${JSON.parse(sessionStorage.getItem('username'))}`)
                    .then(res => {
                        this.setState({
                            isLoading: false,
                            myData: res.data.user_posts
                        })
                    }).catch(err => {
                        alert('Failed to get user profile')
                    });
            }).catch(err => {
                alert('Failed to delete Post');
            });
    }
    handleUpdatePost = (post_id) => {
        this.props.history.push({
            pathname: '/CreatePost',
            onUpdatePost: true,
            state: post_id
        })
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
        return (
            <div className='home hideScroll'>
                <div className='row '>
                    {this.state.myData && this.state.myData.length > 0 ? this.state.myData.map(item => {
                        return (
                            <div className=''>
                                <div className='button'>
                                    <div>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <span style={{ fontSize: 30, fontWeight: 'bold' }}>{item.company_name} | </span>
                                                <span style={{ fontSize: 20, fontWeight: 'bold' }}>@{item.author}</span>
                                            </div>
                                            {this.props.fromProfile &&
                                                <div>
                                                    <span style={{ margin: 20 }}><DeleteIcon style={{ cursor: 'pointer' }} onClick={() => this.handleDeletePost(item.post_id)} /></span>
                                                    <span ><EditIcon style={{ cursor: 'pointer' }} onClick={() => this.handleUpdatePost(item.post_id)} /></span>
                                                </div>
                                            }
                                        </div>
                                        <p onClick={() => this.onNavigateExperience(item.post_id)} style={{ fontSize: 20, padding: 10, margin: 0, cursor: 'pointer' }}>
                                            {`${item.post_description.substring(0, 100)}...`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    ) : <div className='whenNoData'>No posts available </div>}

                </div>
            </div>
        )
    }
}
export default withRouter(Home);