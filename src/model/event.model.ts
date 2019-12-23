export default class Event{
    id : string;
    name: string;
    date: string;
    description: string;
    location : string;
    type : string;
    place: string;
    urlImgActivity: string;
    timeI: string;
    timeF: string;
    assistance: boolean;
    state: string;
    space: number;
    owner: string;
    
    constructor(id : string,
                name: string,
                date: string,
                description : string,
                location : string,
                type : string,
                place : string,
                urlImgActivity : string,
                timeI : string,
                timeF : string,
                assistance : boolean,
                state : string,
                space : number,
                owner : string,
                ) {

        this.id = id;
        this.name = name;
        this.date = date;
        this.description = description;
        this.location = location;
        this.type = type;
        this.place = place;
        this.urlImgActivity = urlImgActivity;
        this.timeI = timeI;
        this.timeF = timeF;
        this.assistance = assistance;
        this.state = state;
        this.space = space;
        this.owner = owner;
    }

    toJson = () : any => {
        return {
            "id" : this.id,
            "name" : this.name,
            "date" : this.date,
            "description" : this.description,
            "location" : this.location,
            "type" : this.type,
            "place" : this.place,
            "urlImgActivity" : this.urlImgActivity,
            "timeI" : this.timeI,
            "timeF" : this.timeF,
            "assistance" : this.assistance,
            "state" : this.state,
            "space" : this.space,
            "fk_user" : this.owner
        }
    }

    toJsonNoId = () : any => {
        return {
            "name" : this.name,
            "date" : this.date,
            "description" : this.description,
            "location" : this.location,
            "type" : this.type,
            "place" : this.place,
            "urlImgActivity" : this.urlImgActivity,
            "timeI" : this.timeI,
            "timeF" : this.timeF,
            "assistance" : this.assistance,
            "state" : this.state,
            "space" : this.space,
            "fk_user" : this.owner

        }
    }

}