import URLS, {HEADERS} from "../config/urls";
import axios from 'axios';
import {setSession} from './session.service';

type userData = {
	username : string,
	password: string,
	callback  : Function
}

//returns true on successful login
//session is stored on local storage as "session"
export const LoginService = ({username, password, callback} : userData) =>{
	axios({
		method: 'post',
		url: URLS.SERVER + URLS.LOGIN_DIR,
		headers:HEADERS,
		data : {
			"username" : username,
			"password" : password
		}
	})
	.then(function (response) {
		  setSession(response.data);
		  //sessionStorage.setItem("session",JSON.stringify(response.data));
		  callback(true);
	}, (error) => {
		//console.log(error);
		callback(false);

	});


}

export const LogoutService = ({username, password, callback} : userData) =>{
	return true;
}