const URLS = {
    SERVER : "http://localhost:3000",
    ACCOUNT_DIR : "/account",
    LOGIN_DIR : "/users/login",
    ALL_EVENT_DIR : "/allactivities",
    EVENT_DIR : "/activities",
    REGISTER_EVENT_DIR : "/assistances",
    
}

export const HEADERS = {
    'Content-Type':'application/json'
}


export function CreateHeaders(token : string ) {
    var result : any = {
    'Content-Type':'application/json',
    'Authorization':'Bearer ' + token
    }

    return result;
}


export default URLS;