import URLS, {HEADERS,CreateHeaders} from "../config/urls";
import axios from 'axios';
import {getSession} from './session.service';
import Event from '../model/event.model'
import {eventSort} from '../component/eventSort';

export function addEvent(event : Event, callback : Function){
    var session = getSession();
    //console.log(session);
    //console.log(CreateHeaders(session.token));
    //console.log(user.toJson());
    axios({
		method: 'post',
		url: URLS.SERVER + URLS.EVENT_DIR,
		headers: CreateHeaders(session.token),
		data : event.toJsonNoId()
	})
	.then(function (response) {
        callback(true);
	}, (error) => {
		console.log(error);
		callback(false);
	});
}

export function updateEvent(event : Event, callback : Function){
    var session = getSession();
    //console.log(session);
    //console.log(CreateHeaders(session.token));
    //console.log(user.toJson());
    axios({
		method: 'patch',
		url: URLS.SERVER + URLS.EVENT_DIR + "/" + event.id,
		headers: CreateHeaders(session.token),
		data : event.toJsonNoId()
	})
	.then(function (response) {
        callback(true);
	}, (error) => {
		console.log(error);
		callback(false);
	});
}


export function getEvents(callback : Function){
	//var session = getSession();
    //console.log(session);
    axios({
		method: 'get',
		url: URLS.SERVER + URLS.ALL_EVENT_DIR,
		headers: HEADERS,
	})
	.then(function (response) {
        callback(response.data);
	}, (error) => {
		console.log(error);
		callback(undefined);
	});
}

export function getEventsNoFilter(callback : Function){
	//var session = getSession();
    //console.log(session);
    axios({
		method: 'get',
		url: URLS.SERVER + URLS.ALL_EVENT_DIR_NO_FILTER,
		headers: HEADERS,
	})
	.then(function (response) {
        callback(response.data);
	}, (error) => {
		console.log(error);
		callback(undefined);
	});
}

export function getEventsFiltered(callback : Function){
	
    axios({
		method: 'get',
		url: URLS.SERVER + URLS.ALL_EVENT_DIR,
		headers: HEADERS,
	})
	.then(function (response) {
		var events : Event[]= []; 
		response.data.forEach(
			(event : any)=>{
				events.push(Event.loadFromJson(event));
			}
		)

		//console.log(events)
		var session = getSession();
	 	var filteredEvents = eventSort(undefined,undefined,undefined,session.id,undefined,events);
        callback(filteredEvents);
	}, (error) => {
		console.log(error);
		callback(undefined);
	});
}


export function registerInEvent(event : Event, name: string, id : string, email:string, callback : Function){
	var body = {
		"fk_activity" : event.id,
		"name" : name,
		"credential" : id,
		"email" : email,
		"state" : event.state,
	}
    axios({
		method: 'post',
		url: URLS.SERVER + URLS.REGISTER_EVENT_DIR,
		headers: HEADERS,
		data : body
	})
	.then(function (response) {
        callback(true);
	}, (error) => {
		console.log(error);
		callback(false);
	});
}


export function getAssitance(id:string,callback : Function){
	//var session = getSession();
    //console.log(session);
    axios({
		method: 'get',
		url: URLS.SERVER + URLS.REGISTER_EVENT_DIR + "/"+id,
		headers: HEADERS,
	})
	.then(function (response) {
        callback(response.data);
	}, (error) => {
		console.log(error);
		callback(undefined);
	});
}