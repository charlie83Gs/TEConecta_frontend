import URLS, {FILE_UPLOAD_HEADERS,CreateHeaders,getImageUploadPath, HEADERS} from "../config/urls";
import axios from 'axios';
import {setSession} from './session.service';

export function uploadImage(container : string, image: any, callback : Function){
    //console.log(session);
    //console.log(CreateHeaders(session.token));
    //console.log(user.toJson());

    
    const formData = new FormData();
    formData.append('file',image)
    axios({
		method: 'post',
		url: getImageUploadPath(container),
		headers: FILE_UPLOAD_HEADERS,
		data : formData
	})
	.then(function (response) {
        callback(true);
	}, (error) => {
		console.log(error);
		callback(false);
	});
}













//deprecated unused not compatible with backend
export async function uploadImageJson(container : string, image: any, callback : Function){
    //console.log(session);
    //console.log(CreateHeaders(session.token));
    //console.log(user.toJson());

    const data = {
        file: await toBase64(image),
    }
    axios({
		method: 'post',
		url: getImageUploadPath(container),
		headers: HEADERS,
		data : data
	})
	.then(function (response) {
        callback(true);
	}, (error) => {
		console.log(error);
		callback(false);
	});
}

const toBase64 = (file : any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    });
   