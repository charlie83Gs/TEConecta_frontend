import React, { Component, Fragment } from 'react'; // let's also import Component
import {Col,Row,Container} from 'reactstrap';
import Header from '../component/Header';
import { Route } from "react-router-dom";
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

type AddEventState = {
  name: string,
  start: Date,
  place: string,
  date: Date,
  end: Date,
  manager: string,
  image: string,
  nameError: boolean,
  startError: boolean,
  placeError: boolean,
  dateError: boolean,
  endError: boolean,
  managerError: boolean
}

export default class AddEvent extends Component<{}, AddEventState> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


  // Before the component mounts, we initialise our state
  componentWillMount() {
    this.setState(
      {   "name" : "",
          "start" : new Date(),
          "place" : "",
          "date" :new Date(),
          "end" :new Date(),
          "manager" : "",
          "image" : "",
          "nameError" : false,
          "startError" : false,
          "placeError" : false,
          "dateError" : false,
          "endError" : false,
          "managerError" : false
      })    
        
  }

  handleSubmit = () => {
    //TODO validation
    let stateUpdate : any = {}
    let err : boolean = false
    //reset status
    stateUpdate["nameError"] = false;
    stateUpdate["phoneError"] = false;
    stateUpdate["placeError"] = false;
    stateUpdate["emailError"] = false;
    stateUpdate["managerError"] = false;

    //mark error on unfilled fields
    if(this.state.name.length < 1){
        err = true;
        stateUpdate["nameError"] = true;
    }
    if(this.state.place.length < 1){
        err = true;
        stateUpdate["phoneError"] = true;
    }
    if(this.state.place.length < 1){
        err = true;
        stateUpdate["placeError"] = true;
    }
    if(this.state.manager.length < 1){
        err = true;
        stateUpdate["managerError"] = true;
    }

    this.setState(stateUpdate);

    if(err) return;




  }

  handleFieldChange = (name : string) => ({target : {value }} : {target : { value:any }}) => {
    let newValue : any = value;
    let update : any = {};
    update[name] = newValue;
    this.setState(update)
  }
  handleDateChange = (name : string) => (date: any) => {
    let newValue : any = date;
    let update : any = {};
    update[name] = newValue;
    this.setState(update)
  }

  render() {
    let myself = this;
    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
            <Header title="Agregar Evento"></Header> 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Row className="m-0">
              <Col md="3" className="ml-4">
              <label>Nombre</label>
                    <TextField
                    className ="login_input"
                    onChange = {myself.handleFieldChange("name")}
                    error = {myself.state.nameError}
                    label={myself.state.nameError ? "Por favor inserta un nombre correcto" : ""}
                    />
              </Col>
              <Col md="3" className="ml-4">
              <label>Inicio</label>
              <KeyboardTimePicker
                className ="login_input"
                value={new Date()}
                onChange={myself.handleDateChange("start")}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
              </Col>
              <Col md="3" className="ml-4">
              <label>Lugar</label>
                    <TextField
                    className ="login_input"
                    onChange = {myself.handleFieldChange("place")}
                    error = {myself.state.nameError}
                    label={myself.state.nameError ? "Por favor inserta un lugar correcto" : ""}
                    />
              </Col>
            </Row>
            <Row className="m-0">
            <Col md="3" className="ml-4">
              <label>Fecha</label>
                  <KeyboardDatePicker
                      className ="login_input"
                      value={new Date()}
                      onChange={myself.handleDateChange("name")}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                  />
              </Col>
              <Col md="3" className="ml-4">
              <label>Fin</label>
                <KeyboardTimePicker
                  className ="login_input"
                  value={new Date()}
                  onChange={myself.handleDateChange("name")}
                  KeyboardButtonProps={{
                    'aria-label': 'change time',
                  }}
              />
              </Col>
              <Col md="3" className="ml-4">
                  <label>Existe Cupo?</label><br></br>
                  <FormControlLabel style={{"display":"inline"}}
                    control={
                      <Checkbox
                        value="checkedA"
                        color="primary"
                      />
                    }
                    label=""
                  />
                  <TextField
                    style={{"width":"5rem" , "backgroundColor" : "white"}}
                    onChange = {myself.handleFieldChange("name")}
                    type="number"
                    
                    />
              </Col>
            </Row>
            <Row  className="justify-content-md-center ml-0 mr-0 mt-3">
            <Button
              variant="contained"
              component="label"
            >
              Subir Imagen
              <input
                type="file"
                style={{ display: "none" }}
              />
            </Button>
            </Row>
            <Row className="m-0">
              <Col xs="11" className="ml-4 mr-4">
              <label>Descripcion</label>
                    <TextField
                    className ="login_input"
                    onChange = {myself.handleFieldChange("name")}
                    error = {myself.state.nameError}
                    label={myself.state.nameError ? "Por favor inserta una descripcion del evento" : ""}
                    multiline
                    rows="12"
                    variant="outlined"
                    />
              </Col>
            </Row>
            <Row className="justify-content-md-center pb-5 pt-3 m-0"> 

                <button 
                        className="mr-4 green teconecta_button mid_lenght"
                        onClick={this.handleSubmit}>
                        Crear
                </button>
                <button 
                        className="mr-4 ml-4 blue teconecta_button mid_lenght"
                        onClick={this.handleSubmit}>
                        Facebook
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
        </div>
        
    )
}
}