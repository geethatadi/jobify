import React, { Component } from 'react';
import './createPost.css';
import { api_url } from '../config';
import axios from 'axios';

class CreatePost extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading:false,
            company_name: '',
            role: '',
            package: '',
            post_description: '',
            errors: {
                role: { hasError: true, message: '' },
                package: { hasError: true, message: '' },
                company_name: { hasError: true, message: '' },
                post_description: { hasError: true, message: '' }
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);

    }


    handleCancel = () => {
        this.props.history.goBack(-1)
    }


    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'role':
                if (value.length > 0) {
                    errors.role.message = '';
                    errors.role.hasError = false;
                } else {
                    errors.role.message = 'Fill this field';
                    errors.role.hasError = true;
                }
                break;
            case 'company_name':
                if (value.length > 0) {
                    errors.company_name.message = '';
                    errors.company_name.hasError = false;
                } else {
                    errors.company_name.message = 'Fill this field';
                    errors.company_name.hasError = true;
                }
                break;
            case 'package':
                if (value.length > 0) {
                    errors.package.message = '';
                    errors.package.hasError = false;
                } else {
                    errors.package.message = 'Fill this field';
                    errors.package.hasError = true;
                }
                break;
            case 'post_description':
                if (value.length > 0) {
                    errors.post_description.message = '';
                    errors.post_description.hasError = false;
                } else {
                    errors.post_description.message = 'Fill this field';
                    errors.post_description.hasError = true;
                }
                break;
            default:
                break;
        }
        this.setState({
            errors,
            [name]: value
        })
    }

    validateForm = errors => {
        const temp = Object.values(errors);
        const valid = !temp.some(val => val.hasError);
        return valid;
    };

    handleUpdate = (post_id) => {
        if (this.validateForm(this.state.errors)) {
            axios.post(`${api_url}/post/update_post`, JSON.stringify({
                post_id: post_id,
                author: JSON.parse(sessionStorage.getItem('username')),
                role: this.state.role,
                company_name: this.state.companyName,
                post_description: this.state.post_description,
                package: this.state.package,
            })).then(res => {
                this.props.history.push('/Profile')
            }).catch(err => {
                alert('Failed to update post')
            });
        }
    }

    handleSubmit = () => {
        if (this.validateForm(this.state.errors)) {
            axios.post(`${api_url}/post/create_post`, JSON.stringify({
                author: JSON.parse(sessionStorage.getItem('username')),
                role: this.state.role,
                company_name: this.state.company_name,
                post_description: this.state.post_description,
                package: this.state.package,
            })).then(res => {
                this.props.history.push('/Profile')
            }).catch(err => {
                alert('Failed to create post')
            });
        }
    }

    handleGetPostData = (post_id) => {
        axios.get(`${api_url}/post/get_single_post?post_id=${post_id}`)
        .then(result => {
            const res = result.data[0]
            this.setState({
                isLoading:false,
                company_name: res.company_name,
                role: res.role,
                package: res.package,
                post_description: res.post_description,
                errors: {
                    role: { hasError: false, message: '' },
                    package: { hasError: false, message: '' },
                    company_name: { hasError: false, message: '' },
                    post_description: { hasError: false, message: '' }
                }
            })
        }).catch(err => {
            alert('Failed to get post')
        });
        
    }

    componentDidMount() {
        const post_id = this.props.location?.state;
        if (this.props.location?.onUpdatePost) {
            this.setState({
                isLoading: true
            })
            this.handleGetPostData(post_id)
        }
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
        const { errors } = this.state;
        return (
            <div className='holder p-1'>
                <div className='row content'>
                    <p className='h2'>Create New Post</p>
                    <div className='inputfields'>
                        <input type='text' name='company_name' placeholder='Company Name' value={this.state.company_name} onChange={this.handleChange} />
                        <span className="error">{errors.company_name.message}</span>
                        <input type='text' name='role' placeholder='Role' value={this.state.role} onChange={this.handleChange} />
                        <span className="error">{errors.role.message}</span>
                        <input type='text' name='package' placeholder='Package' value={this.state.package} onChange={this.handleChange} />
                        <span className="error">{errors.package.message}</span>
                    </div>
                    <label for='post_description' className='h4'>Experience</label><br />
                    <textarea rows='10' cols='50' name='post_description' className='exp hideScroll' value={this.state.post_description} placeholder='Write your experience here..' onChange={this.handleChange} />
                    <span className="error">{errors.post_description.message}</span>
                    <div className="text-center">
                        {this.props.location?.onUpdatePost ?
                            <button type='button' onClick={() => this.handleUpdate(this.props.location?.state)} className='btn'>Update</button>
                            :
                            <button type='button' onClick={this.handleSubmit} className='btn'>Create</button>
                        }
                        <button type='button' onClick={this.handleCancel} className='btn'>Cancel</button>
                    </div>
                    {/* <input type='text' placeholder='Company Name' />    */}
                </div>
            </div>
        )
    }
}

export default CreatePost;