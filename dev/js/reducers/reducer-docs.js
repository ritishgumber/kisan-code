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
    }
    return state;
}
