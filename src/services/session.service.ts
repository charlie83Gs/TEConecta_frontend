


export function getSession(){
    var sessionText = sessionStorage.getItem("session");
    if(sessionText){
        return JSON.parse(sessionText);
    }
    return undefined;
    
}

export function setSession(session : any){
    sessionStorage.setItem("session" , JSON.stringify(session));
}