import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {initApp, getBookById} from '../actions/index';
import {browserHistory, Link} from 'react-router';
import _ from 'underscore'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import RefreshIndicator from 'material-ui/RefreshIndicator';

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
        this.props.initApp();
    }
    descFormatter(cell, row) {
        return cell.substring(0, 50) + '...';
    }
    excerpFormatter(cell, row) {
        return cell.substring(0, 100) + '...'
    }
    handleChange(e) {
        this.props.getBookById(e.target.value)
    }

    render() {
        const options = {
            noDataText: 'No Books Found!!'
        }
        const tableData = this.props.data
        return (

            <div class="container">
                <input type="text" placeholder="Enter book id" onChange={this.handleChange.bind(this)} className="search-btn"/> {this.props.loading
                    ? <RefreshIndicator size={50} left={70} top={70} loadingColor="#FF9800" status="loading" style={style.refresh}/>
                    : <BootstrapTable height={'500px'} data={tableData} options={options} hover className='liveview-table'>
                        <TableHeaderColumn filter={{
                            type: 'TextFilter',
                            delay: 0
                        }} dataField='Title' dataSort={true} columnClassName="liveview-table-data">Title</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} dataField='Description' dataFormat={this.descFormatter} columnClassName="liveview-table-data">Description</TableHeaderColumn>
                        <TableHeaderColumn dataField='PageCount' dataSort={true} columnClassName="liveview-table-data">PageCount</TableHeaderColumn>
                        <TableHeaderColumn dataField='Excerpt' dataSort={true} dataFormat={this.excerpFormatter} columnClassName="liveview-table-data">Excerpt</TableHeaderColumn>
                        <TableHeaderColumn dataField='PublishDate' dataSort={true} columnClassName="liveview-table-data">PublishDate</TableHeaderColumn>
                        <TableHeaderColumn dataField='ID' dataSort={true} isKey={true} columnClassName="liveview-table-data">Distinct Id</TableHeaderColumn>
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
        getBookById
    }, dispatch);
}
export default connect(mapStateToProps, matchDispatchToProps)(App);
