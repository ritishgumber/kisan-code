import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initApp, fetchContacts} from '../actions/index';
import {browserHistory, Link} from 'react-router';
import _ from 'underscore'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Dropzone from 'react-dropzone';

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
        this.state = {};
        //initialise app
        this.props.initApp();
    }

    onDrop(acceptedFiles, rejectedFiles) {
        //handler for file selection
        if (!acceptedFiles[0])
            this.setState({error: true})
        else {
            this.setState({error: false})
            this.props.fetchContacts(acceptedFiles[0].preview);
        }
    }
    nameFormatter(cell, row) {
        //format each cell of table
        return "<a href='/contactsInfo?id=" + row.id + "&firstName=" + row.firstName + "&lastName=" + row.lastName + "&phone=" + row.phone + "&address=" + row.address + "'>" + row.firstName + "</a>"
    }

    render() {
        const options = {
            noDataText: 'No Contacts Found!!'
        }
        const tableData = this.props.data
        const errorStyle = {
            'color': 'red'
        }
        return (

            <div class="container">

                <Dropzone onDrop={this.onDrop.bind(this)} activeClassName="activeDropBody" className="dropBody" accept=".json">
                    <button>Upload Contacts.json</button>
                </Dropzone>
                {this.state.error
                    ? <span style={errorStyle}>Only json files are accepted</span>
                    : ''}
                {/* render loader if busy fetching contacts else show all contatcs */}
                {this.props.loading
                    ? <RefreshIndicator size={50} left={70} top={70} loadingColor="#FF9800" status="loading" style={style.refresh}/>
                    : <BootstrapTable height={'500px'} data={tableData} options={options} hover className='liveview-table'>
                        <TableHeaderColumn dataSort={true} dataField='id' columnClassName="liveview-table-data">ID</TableHeaderColumn>
                        <TableHeaderColumn filter={{
                            type: 'TextFilter',
                            delay: 0
                        }} isKey={true} dataField='firstName' dataFormat={this.nameFormatter} dataSort={true} columnClassName="liveview-table-data">First Name</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} dataField='lastName' columnClassName="liveview-table-data">LastName</TableHeaderColumn>
                    </BootstrapTable>}

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {data: state.data.data, loading: state.data.loading};
}
function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        initApp,
        fetchContacts
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
