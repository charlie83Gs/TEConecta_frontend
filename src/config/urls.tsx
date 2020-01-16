import ROUTES from './routes';

const URLS = {

    SERVER : "https://teconecta-noisy-rhinocerous-te.mybluemix.net",
    DOMAIN : "https://boring-cattle-827.roast.io/",
    PRERENDER : "https://service.prerender.io/", //this is a prerender service to enable facebook view publication metada
    //SERVER : "http://localhost:3000",

    //SERVER : "https://teconecta-noisy-rhinocerous-te.mybluemix.net",
    //SERVER : "http://localhost:3000",
    EVENT_BY_ID_DIR : '/activitie',
    ACCOUNT_DIR : "/account",
    LOGIN_DIR : "/users/login",
    ALL_EVENT_DIR_NO_FILTER : "/allactivities",
    ALL_EVENT_DIR : "/allactivitiesfeed",
    EVENT_DIR : "/activities",
    REGISTER_EVENT_DIR : "/assistances",
    IMAGE_URL : "/containers",
    USERROLE_DIR : "/user-roles",
    UPDATE_PASSWORD : "/account/pchange/"
}

export const HEADERS = {
    'Content-Type':'application/json'
}

export const FILE_UPLOAD_HEADERS = {
    'Content-Type':'multipart/form-data'
}


export function CreateHeaders(token : string ) {
    var result : any = {
    'Content-Type':'application/json',
    'Authorization':'Bearer ' + token
    }

    return result;
}


export function getEventUrl(eventId : string){
    return  window.location.href + ROUTES.VIEW_EVENT_NO_HANDLE +"/"+ eventId
}


export function getShareUrl(eventId : string){
    return "https://www.facebook.com/sharer/sharer.php?u="+ getEventUrl(eventId);
}

export function getImageUploadPath(container: string){
    return URLS.SERVER+URLS.IMAGE_URL+"/"+container+"/upload";
}

export function getImageDownloadPath(container: string, image : any){
    return URLS.SERVER+URLS.IMAGE_URL+container+"/download/" + image.name;
}

export default URLS;