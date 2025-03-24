import React, { Component } from 'react';
import "./Login_and_signup.css";
import { Link } from "react-router-dom"
import Logo from '../Logo/Logo';
import { api_url } from '../config';
import axios from 'axios';


const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);


class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            regno: '',
            user_name: '',
            curr_comapny: '',
            conf_pwd: '',
            errors: {
                email: { hasError: true, message: '' },
                regno: { hasError: true, message: '' },
                user_name: { hasError: true, message: '' },
                curr_company: { hasError: true, message: '' },
                password: { hasError: true, message: '' },
                conf_pwd: { hasError: true, message: '' },
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email':
                if (validEmailRegex.test(value)) {
                    errors.email.message = '';
                    errors.email.hasError = false;
                } else {
                    errors.email.message = 'Email is not valid!';
                    errors.email.hasError = true;
                }
                break;
            case 'regno':
                if (value.length > 2) {
                    errors.regno.hasError = false;
                    errors.regno.message = '';
                } else {
                    errors.regno.hasError = true;
                    errors.regno.message = 'length should be greater than 2';
                }
                break;
            case 'user_name':
                if (value.length > 0) {
                    errors.user_name.hasError = false;
                    errors.user_name.message = '';
                } else {
                    errors.user_name.hasError = true;
                    errors.user_name.message = 'username should not be null';
                }
                break;
            case 'curr_company':
                if (value.length >= 3) {
                    errors.curr_company.hasError = false;
                    errors.curr_company.message = '';
                } else {
                    errors.curr_company.hasError = true;
                    errors.curr_company.message = 'enter a valid company';
                }
                break;
            case 'password':
                if (value.length < 8) {
                    errors.password.message = 'Password is too short!';
                    errors.password.hasError = true;
                } else {
                    errors.password.message = '';
                    errors.password.hasError = false;
                }
                break;
            case 'conf_pwd':
                if (this.state.password === value) {
                    errors.conf_pwd.message = '';
                    errors.conf_pwd.hasError = false;

                } else {
                    errors.conf_pwd.message = 'passwords are not matched!!!';
                    errors.conf_pwd.hasError = true;
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
    handleAddUserInterests = (company_name) => {
        axios.post(`${api_url}/users/add_to_user_interests`, JSON.stringify({
            company_name: company_name,
            user_name: JSON.parse(sessionStorage.getItem('username'))
        })).catch(() => {
            alert('failed to adda user Interest')
        })
    }

    handleSubmit = () => {
        if (this.validateForm(this.state.errors)) {
            axios.post(`${api_url}/users/create_user`, JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                roll_no: this.state.regno,
                current_company: this.state.curr_company,
                user_name: this.state.user_name,
            })).then(res => {
                // sessionStorage.setItem('loggedin',JSON.stringify(true))
                sessionStorage.setItem('username',JSON.stringify(this.state.user_name))
                this.handleAddUserInterests(this.state.curr_company)
                this.props.history.push('/Login')
                // alert('signup success')
            }).catch(() => {
                alert('Failed to sign up')
            })
        }
    }
    render() {
        const { errors } = this.state;
        return (
            <div className='row login_signup'>
                <div className='col-md-6 logo'>
                    <Logo />
                </div>
                <div className='col-md-6'>

                    <div className='container fillForm'>
                        <div className="card">
                            <p>Sign up for your career</p>
                            <input type='email' name="email" placeholder="Email" required onChange={this.handleChange} />
                            <span className="error">{errors.email.message}</span>
                            <br />

                            <input type='text' name='regno' placeholder='Reg.No' required onChange={this.handleChange} />
                            <span className="error">{errors.regno.message}</span>
                            <br />

                            <input type='text' name='user_name' placeholder='User Name' required onChange={this.handleChange} />
                            <span className="error">{errors.user_name.message}</span>
                            <br />

                            <input type='text' name='curr_company' placeholder='current company' required onChange={this.handleChange} />
                            <span className="error">{errors.curr_company.message}</span>
                            <br />

                            <input type='password' name='password' placeholder='Password' required onChange={this.handleChange} />
                            <span className="error">{errors.password.message}</span>
                            <br />

                            <input type='password' name='conf_pwd' placeholder='Confirm Password' required onChange={this.handleChange} />
                            <span className="error">{errors.conf_pwd.message}</span>
                            <br />

                            <div className="pwd_and_btn">
                                <button type="button" onClick={this.handleSubmit} className='btn'>
                                    Signup
                                </button>
                            </div>
                            <div className='haveAccount'>
                                <b>Already have an Account?</b><Link to='/Login' >Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;