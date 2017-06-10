export default function(state = {
    data: [],
    loading: true
}, action) {
    console.log(action);

    switch (action.type) {
        case 'FETCH_DATA':
            return {data: action.payload}
        case 'FETCHING_DATA':
            return {
                ...state,
                loading: true
            }
        case 'FETCHING_DONE':
            return {
                ...state,
                loading: false
            }
        case 'SENDING_MESSAGE':
            return {
                ...state,
                sending: true
            }
        case 'MESSAGE_SENT':
            return {
                ...state,
                sending: false,
                sent: true
            }
        case 'SENDING_MESSAGE_ERROR':
            return {
                ...state,
                sending: false,
                sent: false,
                error: true
            }
    }
    return state;
}
