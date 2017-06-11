import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchList} from '../actions/index';
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
        //fetch list of all messages
        this.props.fetchList();
    }
    formatter(cell) {
        return new Date(cell);
    }

    render() {
        const options = {
            noDataText: 'No Messages Found!!'
        }
        const tableData = this.props.data
        return (

            <div class="container">
                {this.props.loading
                    ? <RefreshIndicator size={50} left={70} top={70} loadingColor="#FF9800" status="loading" style={style.refresh}/>
                    : <BootstrapTable height={'500px'} width={'500px'} data={tableData} options={options} hover className='liveview-table'>
                        <TableHeaderColumn isKey dataSort={true} dataField='name' columnClassName="liveview-table-data">Name</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} dataField='phone' columnClassName="liveview-table-data">Phone</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} dataField='createdAt' columnClassName="liveview-table-data" dataFormat={this.formatter.bind(this)}>Time</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} dataField='otp' columnClassName="liveview-table-data">OTP</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} dataField='text' columnClassName="liveview-table-data">Text</TableHeaderColumn>
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
        fetchList
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
