const URLS = {
    SERVER : "http://localhost:3000",
    ACCOUNT_DIR : "/account",
    LOGIN_DIR : "/users/login",
    EVENT_DIR : "/activities",
    
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