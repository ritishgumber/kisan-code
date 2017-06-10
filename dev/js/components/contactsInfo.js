import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initApp, fetchContacts, fetchContactInfo} from '../actions/index';

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
        //fetch data from url query
        this.state = {
            data: this.props.location.query
        };

    }

    render() {
        const {data} = this.state;
        return (

            <div className="container">
                <table className="">
                    <tbody className="row ">
                        <tr className="col-md-12 contactsInfo">
                            <th className="col-md-6">Name</th>
                            <td className="col-md-6">{data.firstName + ' ' + data.lastName}</td>
                        </tr>
                        <tr className="col-md-12 contactsInfo">
                            <th className="col-md-6">Phone
                            </th>
                            <td className="col-md-6">{data.phone}</td>
                        </tr>
                        <tr className="col-md-12 contactsInfo">
                            <th className="col-md-6">Address</th>
                            <td className="col-md-6">{data.address}</td>
                        </tr>
                    </tbody>
                </table>
                <a href={"/sendMessage?phone=" + data.phone + "&name=" + data.firstName + ' ' + data.lastName}>
                    <button >Send Message</button>
                </a>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
