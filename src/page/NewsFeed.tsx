import React, { Component } from 'react'; // let's also import Component
import {getEvents} from '../services/event.service';
import NewCard from '../component/NewCard';
import Header from '../component/Header';
import Grid from '@material-ui/core/Grid';
import Event from '../model/event.model';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {eventSort} from '../component/eventSort';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import Footer from '../component/Footer';
import Helmet from 'react-helmet';

// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type NewsFeedState = {
  events: Event[] | undefined,
  options: any,
  location: string | undefined,
  type : string | undefined,
  user : string | undefined,
  name : string | undefined,
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
    this.setState({
                    "events" : undefined,
                    "options" : undefined,
                    "location" :"",
                    "type" : "",
                    "user" : "",
                    "name" : "",
                  })
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
    newEvents = Event.sortByDate(newEvents)
    this.setState({"events" : newEvents , "options" : this.getOptionLists(newEvents)});
  }

  getOptionLists = (events : Event[]) =>{
    var locationSet = new Set(); 
    var typeSet = new Set(); 
    var userSet = new Set(); 
     
    events.forEach(
      (event : Event) =>{
        locationSet.add(event.location);
        typeSet.add(event.type);
        userSet.add(event.owner);
      }
    )

    return {
      locations : Array.from(locationSet),
      types : Array.from(typeSet),
      users : Array.from(userSet),
    }

  }

  handleFieldChange = (name : string) => ({target : {value }} : {target : { value:any }}) => {
    let newValue : any = value;
    let update : any = {};
    update[name] = newValue;
    console.log(newValue)
    this.setState(update)
  }

  handleDateChange = (name : string) => (date: any) => {
    let newValue : any = date;
    let update : any = {};
    update[name] = newValue;
    this.setState(update)
    
  }


  onFilterChange = () : Event[] =>{
      
    var filtered : Event[] = []  
    if(this.state.events)
      filtered = eventSort(
        this.state.name,
        this.state.location,
        this.state.type,
        this.state.user,
        undefined,
        this.state.events)
    return filtered;
  }


  // render will know everything!
  render() {
    var filtered = this.onFilterChange();
    return (
      <div className="gray" style={{"minHeight":"100vh"}}>
      <Header title= "" navigate={false}/>
      <Helmet>
        <meta property="og:title" content="TEConecta eventos"/>
        <meta property="og:description" content="Este sitio contiene los eventos que se realizaran en el Instituto Tecnologico De Costa Rica"/>
      </Helmet>
      <div className="blue_container container_100w pt-4 m-0">
      <label className="mr-3 ml-2">
        <label className="w6rem">Sede</label>
      <FormControl className="ml-2">
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="menu_input d-inline"
            displayEmpty 
            value={this.state.location}
            onChange={this.handleFieldChange("location")}
            >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {this.state.options &&
              this.state.options.locations.map(
                (location : string, index : number) => {
                  return(
                  <MenuItem key={index} value={location}>{location}</MenuItem>        
                  )
                }
              )
            }
        </Select>
      </FormControl>
      </label>
      <label className="mr-3 ml-2">
      <label className="w6rem">Tipo</label>
      <FormControl className="ml-2">
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="menu_input d-inline"
            displayEmpty 
            value={this.state.type}
            onChange={this.handleFieldChange("type")}
            >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {this.state.options &&
              this.state.options.types.map(
                (type : string, index : number) => {
                  return(
                  <MenuItem key={index} value={type}>{type}</MenuItem>        
                  )
                }
              )
            }
        </Select>
      </FormControl>
      </label>

      <label className="mr-3 ml-2">
      <label className="w6rem">Grupo</label>
      <FormControl className="ml-2">
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            className="menu_input d-inline"
            displayEmpty 
            value={this.state.user}
            onChange={this.handleFieldChange("user")}
            >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {this.state.options &&
              this.state.options.users.map(
                (user : string, index : number) => {
                  return(
                  <MenuItem key={index} value={user}>{user}</MenuItem>        
                  )
                }
              )
            }
        </Select>
      </FormControl>
      </label>

      <label className="mr-3 ml-2">
        <label className="w6rem m">
          Buscar
          <SearchIcon className="ml-2"></SearchIcon>
        </label>
      <FormControl className="ml-2">
        <TextField  
          className="menu_input"
          value={this.state.name}
          onChange={this.handleFieldChange("name")}
        />
      </FormControl>
      </label>
      </div>

      <div className="p-md-5 p-2">
      <Grid container spacing={6}
        alignItems="center"
      >
      {filtered && filtered.map(
                (event : any,index : number) =>{
                  //console.log(event);
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
      <Footer />
      </div>
    )
  }
}