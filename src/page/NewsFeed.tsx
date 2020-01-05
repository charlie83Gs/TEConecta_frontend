import React, { Component } from 'react'; // let's also import Component
import {getEvents} from '../services/event.service';
import NewCard from '../component/NewCard';
import Header from '../component/Header';
import Grid from '@material-ui/core/Grid';
import Event from '../model/event.model'
// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type NewsFeedState = {
  events: Event[] | undefined,
}

// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
//placeholder image from
//https://loremflickr.com/
export default class NewsFeed extends Component<{}, NewsFeedState> {

  // The tick function sets the current state. TypeScript will let us know
  // which ones we are allowed to set.
  

  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.setState({"events" : undefined})
      getEvents(this.onEventsLoaded);
  }


  onEventsLoaded = (response : any) =>{
    console.log("loaded")
    console.log(response )
    var newEvents : Event[] = [];
    response.forEach(
      (event : any) =>{
        newEvents.push(Event.loadFromJson(event));
      }
    )
    this.setState({"events" : newEvents});
}
  // render will know everything!
  render() {
    
    return (
      <div className="gray" style={{"minHeight":"100vh"}}>
      <Header title= "" navigate={false}/>
      <div style={{ padding: "5rem" }}>
      <Grid container spacing={6}
        alignItems="center"
      >
      {this.state.events && this.state.events.map(
                (event : any,index : number) =>{
                  console.log(event);
                  return (
                    <NewCard 
                      key={index}
                      event={event}
                    />
                  )
                }
                )
      }
      </Grid>
      </div>
      </div>
    )
  }
}