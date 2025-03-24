import React, { Component } from 'react'
import './Password.css'
import EmailSharpIcon from '@material-ui/icons/EmailSharp';
// import { yellow } from '@material-ui/core/colors';
class ForgotPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            email : event.target.value
        })
    }

    async handleSubmit() {
        try {
            const result = await fetch('/forgot_password', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    "Accept" : 'application/json',
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                })
            });

            this.props.history.push("/ResetPassword");

        } catch(e) {
            console.log(e)
        }
    }

    handleCancel = () => {
        // this.props.history.push("/Login")
        this.props.history.goBack(-1)
    }
    render() {
        return (
            <div className='holder'>
                <div className='row content'>
                    {/* <p>
                        Forgot Password
                    </p>
                    <input type='email' placeholder='Email' />
                    <input type='text' placeholder='OTP' /> 
                    <button type='button' onClick={this.handleSubmit} className='btn'>Submit</button> */}
                    <div className="text-center"><EmailSharpIcon style={{ color: 'rgb(218,43,25)', fontSize: 80 }} /></div>
                    <p className='h1'>Forgot Your Password?</p>
                    <span className='h5 mb-5 text-center'>No worries! Enter Your Email and we will send you an OTP</span>

                    <div className="text-center">
                        <input type='email' placeholder='Enter your Email here...' />
                        <br />
                        <button type='button' onClick={this.handleSubmit} onChange={this.handleChange} className='btn '>Submit</button>
                        <button type='button' onClick={this.handleCancel} className='btn'>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ForgotPassword;

// rgb(255,134,88)