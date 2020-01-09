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

    static loadFromJson(data :any) : Event{
        return new Event(
        data.id,
        data.name,
        data.date,
        data.description,
        data.location,
        data.type,
        data.place,
        data.urlImgActivity,
        data.timeI,
        data.timeF,
        data.assistance,
        data.state,
        data.space,
        data.fk_user,
        )

    }

    static sortByDate(events : Event[]){
        return events.sort(compareEventDate);
    }

    getDate() : Date{
        return dateFromString(this.date)
    }

    getTimeI(){
        return timeFromString(this.timeI)
    }

    getTimeF(){
        return timeFromString(this.timeF)
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

const compareEventDate = (event : Event ,event2 : Event) =>{
    if(event.getDate() > event2.getDate()) return 1;
    if(event.getDate() < event2.getDate()) return -1;
    return 0;
}
const dateFromString = (date : string) : Date => {
    var pieces = date.split("/");
    var day = parseInt(pieces[1])
    var month = parseInt(pieces[0])-1
    var year = parseInt(pieces[2])
   
    return new Date(year,month,day)
  }

  
  const timeFromString = (date : string) : Date => {
    var result = new Date();

    var pieces = date.split(":");
    var hours = parseInt(pieces[0])
    var minutes = parseInt(pieces[1])
    var seconds = parseInt(pieces[2])

    result.setHours(hours);
    result.setMinutes(minutes);
    result.setSeconds(seconds);
    return result;
  }
