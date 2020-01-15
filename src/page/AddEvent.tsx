import React, { Component, Fragment } from 'react'; // let's also import Component
import {Col,Row,Container} from 'reactstrap';
import Header from '../component/Header';
import { Route, Redirect } from "react-router-dom";
import { FormLabel,MenuItem,Select,FormGroup, Checkbox } from '@material-ui/core';
import { FormControlLabel,Button,TextField, FormControl} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { green } from '@material-ui/core/colors';
import ROUTES from '../config/routes';
import DateFnsUtils from '@date-io/date-fns';
import Event from '../model/event.model';
import {addEvent, updateEvent} from '../services/event.service';
import {uploadImage} from '../services/image.service';
import {getImageDownloadPath} from '../config/urls'
import {getSession} from '../services/session.service';
import {LOCATION_LIST} from '../config/locations';
import {EVENT_TYPE_LIST} from '../config/eventTypes';


type AddEventState = {
  name: string,
  place: string,
  location: string,
  date: Date,
  start: Date,
  end: Date,
  image: string,
  imageFile: any,
  description: string,
  assistance : boolean,
  space : number,
  type : string,
  nameError: boolean,
  startError: boolean,
  placeError: boolean,
  locationError: boolean,
  dateError: boolean,
  endError: boolean,
  descriptionError: boolean,
  typeError: boolean,
  editMode: boolean,
  created: boolean
}

function formatDateToTime(date : Date) {

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  return hours + ':' + minutes + ':' + seconds;
}

export default class AddEvent extends Component<{}, AddEventState> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


  // Before the component mounts, we initialise our state
  componentWillMount() {

    //load event if selected
    var event : any = sessionStorage.getItem("event");
    var name = "";
    var start = new Date();
    var place = "";
    var location = "";
    var date = new Date();
    var end = new Date();
    var image = "";
    var type = "";
    var description = "";
    var assistance = false;
    var space = 0;
    var editMode =false;
    

    if(event){
      event = JSON.parse(event);
      console.log(event)
      name = event.name;
      location = event.location;
      start = this.timeFromString(event.timeI);
      place = event.place;
      date = this.dateFromString(event.date);
      end = this.timeFromString(event.timeF);
      image = event.urlImgActivity;
      type = event.type;
      description = event.description;
      assistance = (event.assistance );
      space = event.space;
      editMode = true;
    }
    this.setState(
      {   "name" : name,
          "start" : start,
          "place" : place,
          "location" : location,
          "date" : date,
          "end" : end,
          "image" : image,
          "type" : type,
          "description" : description,
          "assistance" : assistance,
          "space" : space,
          "nameError" : false,
          "startError" : false,
          "placeError" : false,
          "locationError" : false,
          "dateError" : false,
          "endError" : false,
          "typeError" : false,
          "descriptionError" : false,
          "editMode" : editMode,
          "created" : false,
      })    
        
  }

  dateFromString = (date : string) : Date => {
   
    return new Date(date)
  }

  timeFromString = (date : string) : Date => {
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

  handleSubmit = () => {
    //TODO validation
    let stateUpdate : any = {}
    let err : boolean = false
    //reset status
    stateUpdate["nameError"] = false;
    stateUpdate["descriptionError"] = false;
    stateUpdate["placeError"] = false;
    stateUpdate["locationError"] = false;
    stateUpdate["typeError"] = false;

    //mark error on unfilled fields
    if(this.state.name.length < 1){
        err = true;
        stateUpdate["nameError"] = true;
    }
    if(this.state.place.length < 1){
        err = true;
        stateUpdate["placeError"] = true;
    }
    if(this.state.type.length < 1){
      err = true;
      stateUpdate["typeError"] = true;
  }
    if(this.state.location.length < 1){
      err = true;
      stateUpdate["locationError"] = true;
  }
    if(this.state.description.length < 1){
        err = true;
        stateUpdate["descriptionError"] = true;
    }


    this.setState(stateUpdate);
    //console.log(err)
    if(err) return;
    var session = getSession();
    //create a new event object
    console.log(this.state.image)
    var imageUrl = this.state.image;
    if(this.state.imageFile){
      var activity_name = "Activity" + this.state.name.replace(/\s+/g, '');
      var imageUrl = getImageDownloadPath(activity_name,this.state.imageFile);
      console.log(imageUrl);
      console.log(this.state.imageFile);
      uploadImage(activity_name, this.state.imageFile,()=>{console.log("upload executed multipart")});
    }
    let event : Event = new Event(
                                  "",
                                  this.state.name,
                                  this.state.date.toISOString(),
                                  this.state.description,
                                  this.state.location,
                                  this.state.type,
                                  this.state.place,
                                  imageUrl,
                                  formatDateToTime(this.state.start),
                                  formatDateToTime(this.state.end),
                                  this.state.assistance,
                                  "Activo",
                                  this.state.space,
                                  session.id
    );
    console.log("create event object")
    if(this.state.editMode){
      console.log("editing")
      var eventSt : any = sessionStorage.getItem("event");
      eventSt = eventSt ? JSON.parse(eventSt) : eventSt;
      event.id = eventSt.id;
      sessionStorage.removeItem("event");
      updateEvent(event,this.onEventAdded);
    }else
      addEvent(event,this.onEventAdded);
    console.log(event)
  }

  onEventAdded = (res : boolean) => {
    console.log(res);
    this.setState({"created" : res})
  }

  handleFieldChange = (name : string) => ({target : {value }} : {target : { value:any }}) => {
    let newValue : any = value;
    let update : any = {};
    update[name] = newValue;
    console.log(newValue)
    this.setState(update)
  }

  

  handleNumberChange = (name : string) => ({target : {value }} : {target : { value:any }}) => {
    let newValue : any = value;
    let update : any = {};
    update[name] = parseInt(newValue);
    //console.log(newValue)
    this.setState(update)
  }

  handleDateChange = (name : string) => (date: any) => {
    let newValue : any = date;
    let update : any = {};
    update[name] = newValue;
    this.setState(update)
  }

  handleImageChange = (name : string) => ({target : {files }} : {target : { files:any }}) => {
    let newValue : any = files[0];
    let update : any = {};
    update[name] = newValue;
    //console.log(newValue)
    //this.handleImageUpload(files[0],"activityX")
    this.setState(update)
  }
  //upload image
  /*handleImageUpload = (image : any, activity_name : string) => { 
    activity_name = activity_name.replace(/\s+/g, '');
    uploadImage("Activity" + activity_name,image,()=>{console.log("upload executed multipart")});
    //uploadImage("uploadImageJson",image,()=>{console.log("upload executed json")});
  }*/

  handleBooleanChange =  (name : string) => (event : any) => {
    this.setState({ ...this.state, [name]: event.target.checked });
  };

  render() {
    let myself = this;
    return(
        <div id="fb-root" className="gray" style={{"minHeight":"100vh"}}>
            <Header title=" - Agregar Evento" navigate={true}></Header> 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Row className="m-0">
              <Col md="3" className="ml-4">
              <label>Nombre</label>
                    <TextField
                    className ="login_input"
                    value={this.state.name}
                    onChange = {myself.handleFieldChange("name")}
                    error = {myself.state.nameError}
                    label={myself.state.nameError ? "Por favor inserta un nombre correcto" : ""}
                    />
              </Col>
              <Col md="3" className="ml-4">
              <label>Inicio</label>
              <KeyboardTimePicker
                className ="login_input"
                value={this.state.start}
                onChange={myself.handleDateChange("start")}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              </Col>
              <Col md="3" className="ml-4">
              <label>Sede</label>
           
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className ="login_input"
                    displayEmpty 
                    value={this.state.location}
                    onChange = {myself.handleFieldChange("location")}
                    error = {myself.state.locationError}
                    >
                    <MenuItem value="">
                      <em>Ninguna</em>
                    </MenuItem>
                    {
                      LOCATION_LIST.map(
                        (location : string, index : number) => {
                          return(
                          <MenuItem key={index} value={location}>{location}</MenuItem>        
                          )
                        }
                      )
                    }
                </Select>
              </Col>
            </Row>
            <Row className="m-0">
            <Col md="3" className="ml-4">
              <label>Fecha</label>
                  <KeyboardDatePicker
                      className ="login_input"
                      value={this.state.date.toString()}
                      onChange={myself.handleDateChange("date")}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                  />
              </Col>
              <Col md="3" className="ml-4">
              <label>Fin</label>
                <KeyboardTimePicker
                  className ="login_input"
                  value={this.state.end}
                  onChange={myself.handleDateChange("end")}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
              />
              </Col>
              <Col md="3" className="ml-4">
              <label>Tipo</label>
           
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    className ="login_input"
                    displayEmpty 
                    value={this.state.type}
                    onChange = {myself.handleFieldChange("type")}
                    error = {myself.state.typeError}
                    >
                    <MenuItem value="">
                      <em>Ninguno</em>
                    </MenuItem>
                    {
                      EVENT_TYPE_LIST.map(
                        (tipo : string, index : number) => {
                          return(
                          <MenuItem key={index} value={tipo}>{tipo}</MenuItem>        
                          )
                        }
                      )
                    }
                </Select>
              </Col>
              
            </Row>
            <Row className="m-0 mt-2 ">
            
              <Col md="3" className="ml-4">
                  <label>Existe Cupo?</label><br></br>
                  <FormControlLabel style={{"display":"inline"}}
                    control={
                      <Checkbox
                        color="primary"
                        value = {this.state.assistance}
                        onChange={myself.handleBooleanChange("assistance")}
                      />
                    }
                    label=""
                  />
                  {myself.state.assistance &&
                  <TextField
                    style={{"width":"12rem" , "backgroundColor" : "white"}}
                    onChange = {myself.handleNumberChange("space")}
                    type="number"
                    value={myself.state.space}   
                    />}
              </Col>
              </Row>
            <Row  className="justify-content-center ml-0 mr-0 mt-3">
            <Button
              variant="contained"
              component="label"
            >
              Subir Imagen
              <input
                type="file"
                style={{ display: "none" }}
                onChange={myself.handleImageChange("imageFile")}
              />
            </Button>
            </Row>
            <Row className="m-0">
            <Col md="11" className="ml-4 mr-4">
              <label>Ubicacion</label>
              <TextField
                    className ="login_input"
                    value={this.state.place}
                    onChange = {myself.handleFieldChange("place")}
                    error = {myself.state.nameError}
                    label={myself.state.nameError ? "Por favor inserta un lugar correcto" : ""}
                    />
              </Col>
            </Row>
            <Row className="m-0">
              <Col xs="11" className="ml-4 mr-4">
              <label>Descripcion</label>
                    <TextField
                    className ="login_input"
                    onChange = {myself.handleFieldChange("description")}
                    error = {myself.state.descriptionError}
                    label={myself.state.descriptionError ? "Por favor inserta una descripcion del evento" : ""}
                    multiline
                    rows="12"
                    variant="outlined"
                    value={this.state.description}
                    />
              </Col>
            </Row>
            <Row className="justify-content-md-center pb-5 pt-3 m-0"> 

                <button 
                        className="mr-4 green teconecta_button mid_lenght"
                        onClick={this.handleSubmit}>
                        {myself.state.editMode ? "Editar" : "Crear"}
                </button>
                <button 
                        className="mr-4 blue teconecta_button mid_lenght" 
                        data-href="https://facebook.com" //Aqui va el link de la pagina de facebook a compartir 
                        data-layout="button" data-size="large">
                          <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fboiling-springs-28349.herokuapp.com%2F&amp;src=sdkpreparse" 
                          className="fb-xfbml-parse-ignore">Compartir</a>
                </button>
                <Route render={({ history}) => (
                <button 
                        className="ml-4 red teconecta_button mid_lenght"
                        onClick={()=>{history.push(ROUTES.MENU)}}>
                        Cancelar
                </button>
                )} />

            </Row>
            </MuiPickersUtilsProvider>
            <Route render={() => {
            if (myself.state.created) {
              return <Redirect push to={ROUTES.MENU} />;
            }

           }}
            />
        </div>
        
    )
}
}