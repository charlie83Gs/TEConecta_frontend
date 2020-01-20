import React, { Component } from 'react'; // let's also import Component
import {Col,Row} from 'reactstrap';
import Header from '../component/Header';
import { Route, Redirect } from "react-router-dom";
import { MenuItem,Select, Typography } from '@material-ui/core';
import { Button,TextField, FormControl} from '@material-ui/core';
import User from '../model/user.model';
import {uploadImage} from '../services/image.service';
import {getImageDownloadPath} from '../config/urls'
import {addUser, updateUser, addRoleToUser} from '../services/user.services';
import ROUTES from '../config/routes';
import {LOCATION_LIST} from '../config/locations';
import UserRole from '../model/user-role.model';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const adminOptions = [
    { label: 'Grupo de interes' },
    { label: 'Administrador del sistema' }
  ]


  type AddUserState = {
    name: string,
    description: string,
    location: string,
    userType: number,
    place: string,
    email: string,
    phone: string,
    manager: string,
    image: string,
    imageFile: any,
    nameError: boolean,
    descriptionError: boolean,
    userTypeError: boolean,
    placeError: boolean,
    emailError: boolean,
    locationError: boolean,
    phoneError: boolean,
    managerError: boolean,
    imageError: boolean,
    created : boolean,
    editMode : boolean,
    UserId : string,
    open: boolean,
    setOpen: boolean,
    correct: boolean
  }
  

export default class AddUser extends Component<{}, AddUserState> {
  UserId: string = "";


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


  // Before the component mounts, we initialise our state
  componentWillMount() {
    //var username : any = localStorage.getItem("username");
    var user : any = sessionStorage.getItem("user");
    var UserId : string = "test";
    let name : string = "";
    let description : string = "";
    let place : string = "";
    var location = "";
    var image = "";
    let email : string = "";
    let phone : string = "";
    let manager : string = "";
    let editMode : boolean = false;

    if(user){
        user = JSON.parse(user);
        editMode = true;
        name = user.name;
        location = user.location;
        description = user.description;
        place = user.place;
        image = user.urlImgActivity;
        email = user.id;
        phone = user.phone;
        manager = user.manager;
        UserId = user.id;
    }

    this.setState(
        {   "name" : name,
            "description" : description,
            "userType" : 0,
            "place" : place,
            "location" : location,
            "email" : email,
            "phone" : phone,
            "manager" : manager,
            "image" : image,
            "UserId" : UserId,
            "nameError" : false,
            "descriptionError" : false,
            "userTypeError" : false,
            "placeError" : false,
            "locationError" : false,
            "emailError" : false,
            "phoneError" : false,
            "managerError" : false,
            "imageError" : false,
            "created" : false,
            "editMode" : editMode,
            "open": false,
            "setOpen": false,
            "correct": false
        })    
  }

  handleFieldChange = (name : string) => ({target : {value }} : {target : { value:any }}) => {
    let newValue : any = value;
    let update : any = {};
    update[name] = newValue;
    this.setState(update)
  }

  handleImageChange = (name : string) => ({target : {files }} : {target : { files:any }}) => {
    let newValue : any = files[0];
    let update : any = {};
    update[name] = newValue;
    console.log(newValue)
    this.setState(update)
  }

  handleSubmit = () => {
    //TODO validation
    let stateUpdate : any = {}
    let err : boolean = false
    //reset status
    stateUpdate["nameError"] = false;
    stateUpdate["phoneError"] = false;
    stateUpdate["locationError"] = false;
    stateUpdate["emailError"] = false;
    stateUpdate["managerError"] = false;
    stateUpdate["placeError"] = false;

    //mark error on unfilled fields
    if(this.state.name.length < 1){
        err = true;
        stateUpdate["nameError"] = true;
    }
    if(this.state.phone.length < 1 || this.state.phone.length >8 ){
        err = true;
        stateUpdate["phoneError"] = true;
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
    if(this.state.location.length < 1){
        err = true;
        stateUpdate["locationError"] = true;
    }
    if(this.state.place.length < 1){
      err = true;
      stateUpdate["placeError"] = true;
  }

    this.setState(stateUpdate);
    if(err) return;
    console.log(this.state.image)
    var imageUrl = this.state.image;
    if(this.state.imageFile){
        var activity_name = "Usuario" + this.state.UserId.replace(/\s+/g, '');
        imageUrl = getImageDownloadPath(activity_name,this.state.imageFile);
        console.log(imageUrl);
        console.log(this.state.imageFile);
        uploadImage(activity_name, this.state.imageFile,()=>{console.log("upload executed multipart")});
      }
    var user: User = new User(
                            "0",
                            this.state.name,
                            this.state.phone,
                            this.state.location,
                            this.state.place,
                            this.state.description,
                            this.state.email,
                            "1234",
                            imageUrl,
                            this.state.manager,
                            );
    if(this.state.editMode){
        var userSt : any = sessionStorage.getItem("user");
        userSt = userSt ? JSON.parse(userSt) : userSt;
        user.password = userSt.password;
        user.id = userSt.id;
        updateUser(user,this.onRoleAdded);
        sessionStorage.removeItem("user");
    }else{
      addUser(user, this.onUserAdded);
    }
  }
  onUserAdded = (result : any) => {
    var id: string = "";
    id = User.loadFromJson(result).id;
    console.log(id);
    var userrole : UserRole =  new UserRole("0",id,'ADMINREG');
    addRoleToUser(userrole,this.onRoleAdded);
  }

  onRoleAdded = (result :   boolean) =>{
    if(result) {this.handleClickOpen();}
  }

  handleClickAcepted = () => {
    this.setState({created : true});
  };

  handleClickOpen = () => {
    //if(this.state.correct)
      this.setState({open:true});
  };

  handleClose = () => {
    this.setState({open:false});
  };

  render() {
    var myself = this;
    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
                
            <Header title=" - Agregar Usuario" navigate={true}></Header>
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
            <Row className=" ml-0 mr-0"> 
                <Col className="ml-5 mr-5 mb-2" md="4">
                    <label>Ubicación*</label>
                    <TextField
                    id="standard-helperText"
                    className ="login_input"
                    value={this.state.place}
                    onChange = {myself.handleFieldChange("place")}
                    error = {myself.state.placeError}
                    label={myself.state.placeError ? "Por favor inserta una ubicación del grupo" : ""}
                    type="email"
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
            <Row className=" justify-content-center ml-0 mr-0 mt-3"> 
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
              <Typography className="mt-0 pl-2 pr-2" variant="body2" color="textSecondary" component="p">
                { this.state.imageFile && this.state.imageFile.name }
              </Typography>
            </Button>
            </Row>
            <Row className="justify-content-md-center pb-5 pt-3 mr-0 ml-0"> 
                <button 
                        className="mr-4 green teconecta_button mid_lenght"
                        onClick={this.handleSubmit}>
                        {this.state.editMode ? "Actualizar" : "Crear"}
                </button>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{myself.state.editMode ? "Edición" : "Creación"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                  {myself.state.editMode ? "Se modificaron los datos de la actividad correctamente." : "Se creo la actividad correctamente."}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <button className="mr-4 green teconecta_button mid_lenght"
                   onClick={() => {this.handleClose(); this.handleClickAcepted()}} color="primary" autoFocus>
                    Aceptar
                  </button>
                </DialogActions>
              </Dialog>
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