import React, { Component } from 'react';
import './Password.css'
import LockIcon from '@material-ui/icons/Lock';
import { isWidthDown } from '@material-ui/core';

class ChangePassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pwd: "",
            conf_pwd: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    async handleSubmit() {
        try {
            const result = await fetch('/set_new_password', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    "Accept": 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    pwd: this.state.pwd,
                    conf_pwd: this.state.conf_pwd
                })
            });

            this.props.history.push("/Login")

        } catch (e) {
            console.log(e)
        }
        // this.props.history.push("/Login")
    }

    handleCancel = () => {
        this.props.history.push("/Login")
    }
    render() {
        return (
            <div className='holder'>
                <div className='row content'>
                    <div className='text-center'><LockIcon style={{ color: 'rgb(218,43,25)', fontSize: 100 }} /></div>
                    <p className='h1 mb-5'>Set a New Password</p>
                    <div className='text-center'>
                        <input type='password' placeholder='New Password..' name='pwd' /><br />
                        <input type='password' placeholder='Confirm Password..' name='conf_pwd' /><br />
                        <button type='button' onClick={this.handleSubmit} onChange={this.handleChange} className='btn' >Change</button>
                        <button type='button' onClick={this.handleCancel} className='btn'>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePassword;
