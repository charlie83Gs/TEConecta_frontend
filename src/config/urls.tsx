const URLS = {
    SERVER : "https://teconecta-noisy-rhinocerous-te.mybluemix.net",
    DOMAIN : "https://boiling-springs-28349.herokuapp.com/",
    //SERVER : "http://localhost:3000",
    ACCOUNT_DIR : "/account",
    LOGIN_DIR : "/users/login",
    ALL_EVENT_DIR_NO_FILTER : "/allactivities",
    ALL_EVENT_DIR : "/allactivitiesfeed",
    EVENT_BY_ID_DIR : "/activitie",
    EVENT_DIR : "/activities",
    REGISTER_EVENT_DIR : "/assistances",
    IMAGE_URL : "/containers",
    
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

export function getImageUploadPath(container: string){
    return URLS.SERVER+URLS.IMAGE_URL+"/"+container+"/upload";
}

export function getImageDownloadPath(container: string, image : any){
    return URLS.SERVER+URLS.IMAGE_URL+"/"+container+"/download/" + image.name;
}
export default URLS;