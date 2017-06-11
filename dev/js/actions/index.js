import axios from 'axios';
import _ from 'underscore';

export const initApp = () => {

    //fetch default contacts from url

    return ((dispatch) => {
        dispatch({type: 'FETCHING_DATA'});
        CB.CloudApp.init('jwnxvlsujgwa', 'c5e0e436-d585-4b23-a06d-6f079860e362');
        axios({
            url: 'https://api.cloudboost.io/file/wxvjyxhmhaqr/8q472qWJ.json',
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            //dispatch data
            dispatch({type: 'FETCH_DATA', payload: res.data.contacts})
        }, (err) => {
            console.log(err)
            dispatch({type: 'FETCHING_DONE'})
        })
    })
}

export const fetchContacts = (url) => {
    //fetch contatcs from uploaded file
    return ((dispatch) => {
        dispatch({type: 'FETCHING_DATA'});
        axios({
            url: url,
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            dispatch({type: 'FETCH_DATA', payload: res.data.contacts})
            dispatch({type: 'FETCHING_DONE'});

        }, (err) => {
            console.log(err)
            dispatch({type: 'FETCH_DATA', payload: []})
            dispatch({type: 'FETCHING_DONE'})
        })
    })
}

export const sendMessage = (phone, text, otp, name) => {
    return ((dispatch) => {
        dispatch({type: 'SENDING_MESSAGE'});
        CB.CloudApp.init('jwnxvlsujgwa', 'c5e0e436-d585-4b23-a06d-6f079860e362');
        //save message sent details
        if (!text)
            text = '';
        var obj = new CB.CloudObject('Records');
        obj.set('text', text);
        obj.set('otp', parseInt(otp));
        obj.set('phone', parseInt(phone));
        obj.set('name', name)

        obj.save({
            success: function(obj) {
                //send message
                axios({
                    url: 'https://hooks.zapier.com/hooks/catch/2301167/9wtc5l/?phone=' + phone + '&text=  Hi. Your OTP is: ' + otp + ' ' + text,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then((res) => {
                    dispatch({type: 'MESSAGE_SENT'})

                }, (err) => {
                    console.log(err)
                    dispatch({type: 'SENDING_MESSAGE_ERROR'})
                })
            },
            error: function(error) {
                dispatch({type: 'SENDING_MESSAGE_ERROR'})
            }
        });

    })
}

export const fetchList = () => {
    //fetch list of all messages
    return ((dispatch) => {
        dispatch({type: 'FETCHING_DATA'});
        CB.CloudApp.init('jwnxvlsujgwa', 'c5e0e436-d585-4b23-a06d-6f079860e362');

        var query = new CB.CloudQuery('Records');
        query.orderByDesc('createdAt');
        query.find({
            success: function(list) {
                console.log(list);
                dispatch({
                    type: 'FETCH_DATA',
                    payload: _.pluck(list, 'document')
                })
            },
            error: function(error) {
                console.log(error);
            }
        });
    })
}
