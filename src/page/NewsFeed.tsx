import React, { Component } from 'react'; // let's also import Component
import {getEvents} from '../services/event.service';
import NewCard from '../component/NewCard';
// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type NewsFeedState = {
  events: any,
}

// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
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
    this.setState({"events" : response});
}
  // render will know everything!
  render() {
    
    return (
      <div>
      <p>The current time is </p>
      {this.state.events && this.state.events.map(
                (event : any,index : number) =>{
                  console.log(event);
                  return (
                    <NewCard 
                      title={event.name} 
                      paragraph={event.description}/>
                  )
                }
                )
      }
      </div>
    )
  }
}