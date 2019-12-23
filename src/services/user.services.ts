import URLS, {HEADERS,CreateHeaders} from "../config/urls";
import axios from 'axios';
import {getSession} from './session.service';
import User from '../model/user.model'

export function addUser(user : User, callback : Function){
    var session = getSession();
    console.log(session);
    console.log(CreateHeaders(session.token));
    console.log(user.toJson());
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

export function updateUser(user : User, callback : Function){
    var session = getSession();
    axios({
		method: 'patch',
		url: URLS.SERVER + URLS.ACCOUNT_DIR,
		headers: CreateHeaders(session.token),
		data : user.toJsonNoId
	})
	.then(function (response) {
        callback(true);
	}, (error) => {
		//console.log(error);
		callback(false);
	});
}

export function disableUser(user : User){

}

export function deleteUser(user : User){

}