import URLS, {HEADERS,CreateHeaders} from "../config/urls";
import axios from 'axios';
import {getSession} from './session.service';
import User from '../model/user.model'

export function addEvent(user : User, callback : Function){
    var session = getSession();
    //console.log(session);
    //console.log(CreateHeaders(session.token));
    //console.log(user.toJson());
    axios({
		method: 'post',
		url: URLS.SERVER + URLS.ACCOUNT_DIR,
		headers: CreateHeaders(session.token),
		data : user.toJson()
	})
	.then(function (response) {
        callback(true);
	}, (error) => {
		console.log(error);
		callback(false);
	});
}



export function getEvents(callback : Function){
    axios({
		method: 'get',
		url: URLS.SERVER + URLS.EVENT_DIR,
		headers: HEADERS,
	})
	.then(function (response) {
        callback(response.data);
	}, (error) => {
		console.log(error);
		callback(undefined);
	});
}
