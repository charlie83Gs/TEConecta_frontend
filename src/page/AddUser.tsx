import React, { Component, Fragment } from 'react'; // let's also import Component
import {Col,Row,Container} from 'reactstrap';
import Header from '../component/Header';
import { Route, Redirect } from "react-router-dom";
import { FormLabel,MenuItem,Select,FormGroup } from '@material-ui/core';
import { FormControlLabel,Button,TextField, FormControl} from '@material-ui/core';
import User from '../model/user.model';
import {addUser, updateUser} from '../services/user.services';
import ROUTES from '../config/routes';
const adminOptions = [
    { label: 'Grupo de interes' },
    { label: 'Administrador del sistema' }
  ]


  type AddUserState = {
    name: string,
    description: string,
    userType: number,
    place: string,
    email: string,
    phone: string,
    manager: string,
    image: string,
    nameError: boolean,
    descriptionError: boolean,
    userTypeError: boolean,
    placeError: boolean,
    emailError: boolean,
    phoneError: boolean,
    managerError: boolean,
    imageError: boolean,
    created : boolean;
    editMode : boolean;
  }
  

export default class AddUser extends Component<{}, AddUserState> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


  // Before the component mounts, we initialise our state
  componentWillMount() {
    //var username : any = localStorage.getItem("username");
    var user : any = sessionStorage.getItem("user");
    let name : string = "";
    let description : string = "";
    let place : string = "";
    let email : string = "";
    let phone : string = "";
    let manager : string = "";
    let editMode : boolean = false;
    if(user){
        user = JSON.parse(user);
        editMode = true;
        name = user.name;
        description = user.description;
        place = user.place;
        email = user.id;
        phone = user.phone;
        manager = user.manager;
    }

    this.setState(
        {   "name" : name,
            "description" : description,
            "userType" : 0,
            "place" : place,
            "email" : email,
            "phone" : phone,
            "manager" : manager,
            "image" : "",
            "nameError" : false,
            "descriptionError" : false,
            "userTypeError" : false,
            "placeError" : false,
            "emailError" : false,
            "phoneError" : false,
            "managerError" : false,
            "imageError" : false,
            "created" : false,
            "editMode" : editMode,
        })    
  }

  handleFieldChange = (name : string) => ({target : {value }} : {target : { value:any }}) => {
    let newValue : any = value;
    let update : any = {};
    update[name] = newValue;
    this.setState(update)
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
    if(this.state.phone.length < 1){
        err = true;
        stateUpdate["phoneError"] = true;
    }
    if(this.state.place.length < 1){
        err = true;
        stateUpdate["placeError"] = true;
    }
    if(this.state.email.length < 1){
        err = true;
        stateUpdate["emailError"] = true;
    }
    if(this.state.description.length < 1){
        err = true;
        stateUpdate["descriptionError"] = true;
    }
    if(this.state.manager.length < 1){
        err = true;
        stateUpdate["managerError"] = true;
    }

    this.setState(stateUpdate);

    if(err) return;

    var user: User = new User(
                            "0",
                            this.state.name,
                            this.state.phone,
                            this.state.place,
                            this.state.place,
                            this.state.description,
                            this.state.email,
                            "1234",
                            "",
                            this.state.manager,
                            );
    if(this.state.editMode){
        var userSt : any = sessionStorage.getItem("user");
        userSt = userSt ? JSON.parse(userSt) : userSt;
        user.password = user.password;
        user.id = userSt.id;
        updateUser(user,this.onUserAdded);
        sessionStorage.removeItem("user");
    }else
    addUser(user,this.onUserAdded);


  }

  onUserAdded = (result : boolean) =>{
    if(result) this.setState({created:true})
  }


  render() {
    var myself = this;
    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
                
            <Header title="Agregar Usuario" navigate={true}></Header>
            <Row className="mt-4 ml-0 mr-0"> 
                <Col className="ml-5 mr-5 mb-2" md="4">
                    <label>Nombre*</label>
                    <TextField
                    id="standard-helperText"
                    className ="login_input"
                    value={this.state.name}
                    onChange = {myself.handleFieldChange("name")}
                    error = {myself.state.nameError}
                    label={myself.state.nameError ? "Por favor inserta un nombre correcto" : ""}
                    />

                </Col>
            </Row>

            <Row className=" ml-0 mr-0"> 
                <Col className="ml-5 mr-5 mb-2" md="4">
                    <FormControl style={{"width":"100%"}}>
                    <label>Tipo*</label>
                    <Select className="login_input"  
                        labelId="label" 
                        id="select" 
                        value={this.state.userType} 
                        onChange={myself.handleFieldChange("userType")} 
                        >
                    {adminOptions.map(
                        (item,index) => {
                        return (<MenuItem value={index} key={index}>{item.label}</MenuItem>)        
                        }
                    )}
                  
                    </Select>
                    </FormControl>

                </Col>
            </Row>
            <Row className=" ml-0 mr-0"> 
                <Col className="ml-5 mr-5 mb-2" md="4">
                    <label>Sede*</label>
                    <TextField
                    id="standard-helperText"
                    className ="login_input"
                    value={this.state.place}
                    onChange = {myself.handleFieldChange("place")}
                    error = {myself.state.placeError}
                    label={myself.state.placeError ? "Por favor inserta una sede correcto" : ""}
                    />
                </Col>
            </Row>
            <Row className=" ml-0 mr-0"> 
                <Col className="ml-5 mr-5 mb-2" md="4">
                    <label>Correo*</label>
                    <TextField
                    id="standard-helperText"
                    className ="login_input"
                    value={this.state.email}
                    onChange = {myself.handleFieldChange("email")}
                    error = {myself.state.emailError}
                    label={myself.state.emailError ? "Por favor inserta un correo correcto" : ""}
                    type="email"
                    />
                </Col>
            </Row>
            <Row className=" ml-0 mr-0"> 
                <Col className="ml-5 mr-5 mb-2" md="4">
                    <label>Telefono*</label>
                    <TextField
                    id="standard-helperText"
                    className ="login_input"
                    value={this.state.phone}
                    onChange = {myself.handleFieldChange("phone")}
                    error = {myself.state.phoneError}
                    label={myself.state.phoneError ? "Por favor inserta un telefono correcto" : ""}
                    />
                </Col>
            </Row>
            <Row className=" ml-0 mr-0"> 
                <Col className="ml-5 mr-5 mb-2" md="4">
                    <label>Encargado*</label>
                    <TextField
                    id="standard-helperText"
                    className ="login_input"
                    value={this.state.manager}
                    onChange = {myself.handleFieldChange("manager")}
                    error = {myself.state.managerError}
                    label={myself.state.managerError ? "Por favor inserta un encargado correcto" : ""}
                    />
                </Col>
            </Row>
            <Row className=" ml-0 mr-0"> 
                <Col className="ml-5 mr-5 mb-2"  md="4">
                    <label>Descripcion*</label>
                    <TextField
                    id="standard-helperText"
                    className ="login_input"
                    value={this.state.description}
                    onChange = {myself.handleFieldChange("description")}
                    multiline
                    rows="4"
                    error = {myself.state.descriptionError}
                    label={myself.state.descriptionError ? "Por favor inserta un encargado correcto" : ""}
                    />
                </Col>
            </Row>
            <Row className=" ml-0 mr-0"> 
                <Col className="ml-5 mr-5 mb-2" md="4">
                    <label>Imagen</label>
                    <TextField
                    id="standard-helperText"
                    className ="login_input"
                    onChange = {myself.handleFieldChange("image")}
                    error = {myself.state.imageError}
                    label={myself.state.imageError ? "Por favor inserta un email correcto" : ""}
                    />
                </Col>
            </Row>
            <Row className="justify-content-md-center pb-5 pt-3 mr-0 ml-0"> 
                <button 
                        className="mr-4 green teconecta_button mid_lenght"
                        onClick={this.handleSubmit}>
                        {this.state.editMode ? "Actualizar" : "Crear"}
                </button>
                <Route render={({ history}) => (
                <button 
                        className="ml-4 red teconecta_button mid_lenght"
                        onClick={()=>{sessionStorage.removeItem("user");history.goBack()}}>
                        Cancelar
                </button>
                )} />

            </Row>
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

//description field
/*
           
*/