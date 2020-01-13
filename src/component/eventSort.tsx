import Event from '../model/event.model';

//sede 
//tipo
//titulo
const threshold = 0.8;
export const eventSort = (
                            title : string | undefined, 
                            location : string | undefined,
                            type : string | undefined,
                            user : string | undefined,
                            date : Date | undefined,
                            events : Event[]
                        ) => {

    var remainingEvents = events;
    var filteredEvents : Event[] = [];

    //filter by title
    if(title && title.length > 0){
        remainingEvents.forEach(
            (event)=>{
                if(similarity(event.name.toLowerCase(), title.toLowerCase()) > threshold || event.name.toLowerCase().includes(title.toLowerCase()))
                    filteredEvents.push(event);
            }
        )
        //set the pool of events to the result
        remainingEvents = filteredEvents;
        filteredEvents = []
    }

    //filter by location
    if(location && location.length > 0){
        remainingEvents.forEach(
            (event)=>{
                if(similarity(event.location, location) > threshold )
                    filteredEvents.push(event);
                    //console.log(event.location, location,similarity(event.location, location), similarity(event.location, location) > threshold)
            }
        )
        //set the pool of events to the result
        //console.log(filteredEvents)
        remainingEvents = filteredEvents;
        filteredEvents = []
    }

    //filter by type
    if(type && type.length > 0){
        remainingEvents.forEach(
            (event)=>{
                if(similarity(event.type, type) > threshold )
                    filteredEvents.push(event);
            }
        )
        //set the pool of events to the result
        remainingEvents = filteredEvents;
        filteredEvents = []
    }

    //filter by user
    if(user && user.length > 0){
        remainingEvents.forEach(
            (event)=>{
                if(similarity(event.owner, user) > threshold )
                    filteredEvents.push(event);
            }
        )
        //set the pool of events to the result
        remainingEvents = filteredEvents;
        filteredEvents = []
    }

    if(date){
        remainingEvents.forEach(
            (event)=>{
                var pieces = event.date.split("/");
                var day = pieces[0];
                var month = pieces[1];
                var year = pieces[2];
                if(year == date.getFullYear() +"" && month == date.getMonth() + "" && day == date.getDay+"")
                    filteredEvents.push(event);
            }
        )

        //set the pool of events to the result
        remainingEvents = filteredEvents;
        filteredEvents = []
    }

    return remainingEvents;
}


//utility functions for string similitude
//recovered from
//https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
function similarity(s1 : string, s2 : string) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength +"");
  }

  function editDistance(s1 : string, s2 : string) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }