import React, { Component } from 'react'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import './Password.css'
class ResetPassword extends Component {
    constructor(props) {
        super(props)
        this.state = {
            otp : ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

     async handleSubmit() {
        try {
            const result = await fetch('/enter_otp', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    "Accept" : 'application/json',
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({
                    otp: this.state.otp
                })
            });

            this.props.history.push('/')

        } catch(e) {
            console.log(e)
        }
        this.props.history.push("/ChangePassword")
    }

    handleCancel = () => {
        this.props.history.push("/Login")
    }

    handleChange = (event) => {
        this.setState({
            otp : event.target.value
        })
    }
    render() {
        return (
            <div className='holder'>
                <div className='row content'>
                    <div className='text-center'><VpnKeyIcon style={{ color: 'rgb(218,43,25)', fontSize: 100 }}/></div>
                    <p className='h1'>Reset Password</p>
                    <span className='h5 mb-5 text-center'>Enter the OTP that is sent to your Mail</span>
                    <div className='text-center'>
                        <input className='text-center' type='text' placeholder='OTP' required/>
                        <br/>
                        <button type='button' onClick={this.handleSubmit} onChange={this.handleChange}className='btn'>Submit</button>
                        <button type='button' onClick={this.handleCancel} className='btn'>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ResetPassword;