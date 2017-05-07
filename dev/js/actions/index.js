import axios from 'axios';

export const initApp = () => {
    return ((dispatch) => {
        dispatch({type: 'FETCHING_DATA'});
        axios({
            url: 'http://fakerestapi.azurewebsites.net/api/Books',
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            dispatch({type: 'FETCH_DATA', payload: res.data})
        }, (err) => {
            console.log(err)
            dispatch({type: 'FETCHING_DONE'})
        })
    })
}

export const getBookById = (id) => {
    return ((dispatch) => {
        dispatch({type: 'FETCHING_DATA'});
        axios({
            url: 'http://fakerestapi.azurewebsites.net/api/Books/' + id,
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            if (Object.prototype.toString.call(res.data) === '[object Array]') {
                dispatch({type: 'FETCH_DATA', payload: res.data})
            } else {
                dispatch({
                    type: 'FETCH_DATA',
                    payload: [res.data]
                })
            }
            dispatch({type: 'FETCHING_DONE'});

        }, (err) => {
            console.log(err)
            dispatch({type: 'FETCH_DATA', payload: []})
            dispatch({type: 'FETCHING_DONE'})
        })
    })
}
