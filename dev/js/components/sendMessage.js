import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {sendMessage} from '../actions/index';

const style = {
    refresh: {
        display: 'inline-block',
        position: 'relative'
    }
};
class App extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            data: this.props.location.query,
            otp: Math.floor(100000 + Math.random() * 900000)
        };

    }
    sendMessage(phone, text, otp, name) {
        //remove any white spaces from phone
        phone = phone.trim()
        if (phone.length === 13 || phone.length === 12) {
            this.setState({error: false})
            this.props.sendMessage(phone, this.state.text, otp, name)
        } else if (phone.length === 10) {
            //prefix country code in case of 10 digit phone number
            phone = '91' + phone
            this.setState({error: false})
            this.props.sendMessage(phone, this.state.text, otp, name)
        } else {
            this.setState({error: true})
        }

    }
    handleChange(e) {
        this.setState({text: e.target.value})
    }
    render() {
        const {data, otp, text} = this.state;
        return (

            <div className="container"><br/><br/>
                Hi. Your OTP is: {otp}<br/>
                <textarea rows="4" cols="50" onChange={this.handleChange.bind(this)}></textarea>
                <br/>
                <button className="btn btn-primary" onClick={this.sendMessage.bind(this, data.phone, text, otp, data.name)} disabled={this.props.sending}>Send</button>

                {this.props.error
                    ? 'Message Sending Error'
                    : (this.props.sending
                        ? 'Sending Message'
                        : this.props.sent
                            ? 'Message Sent'
                            : '')}<br/> {this.state.error
                    ? 'Check Mobile Number'
                    : ''}

            </div>
        )
    }
}

function mapStateToProps(state) {
    let {sending, sent, error} = state.data;
    return {sending, sent, error};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        sendMessage
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
