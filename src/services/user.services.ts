import URLS, {HEADERS,CreateHeaders} from "../config/urls";
import axios from 'axios';
import {getSession} from './session.service';
import User from '../model/user.model'

export function addUser(user : User, callback : Function){
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

export function updateUser(user : User, callback : Function){
    var session = getSession();
    axios({
		method: 'patch',
		url: URLS.SERVER + URLS.ACCOUNT_DIR + "/" + user.email,
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

export function getUsers(callback : Function){
    axios({
		method: 'get',
		url: URLS.SERVER + URLS.ACCOUNT_DIR,
		headers: HEADERS,
	})
	.then(function (response) {
        callback(response.data);
	}, (error) => {
		//console.log(error);
		callback(undefined);
	});
}

export function getUser(id : string ,callback : Function){
    axios({
		method: 'get',
		url: URLS.SERVER + URLS.ACCOUNT_DIR + "/" + id,
		headers: HEADERS,
	})
	.then(function (response) {
        callback(response);
	}, (error) => {
		//console.log(error);
		callback(undefined);
	});
}

export function disableUser(user : User){

}

export function deleteUser(id : string ,callback : Function){
    axios({
		method: 'delete',
		url: URLS.SERVER + URLS.ACCOUNT_DIR + "/" + id,
		headers: HEADERS,
	})
	.then(function (response) {
        callback(response);
	}, (error) => {
		//console.log(error);
		callback(undefined);
	});
}