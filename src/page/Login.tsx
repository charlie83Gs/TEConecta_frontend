import React, { Component, Fragment } from 'react'; // let's also import Component
import {Col,Row,Container} from 'reactstrap';
import Header from '../component/Header';
import { Route, Redirect } from "react-router-dom";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

import {LoginService} from "../services/login.service"
import URLS from '../config/urls';
import { isNull } from 'util';
import { useHistory } from "react-router-dom";
import ROUTES from '../config/routes';
import { FormLabel } from '@material-ui/core';
// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type LoginState = {
  username : string,
  password : string,
  session : any,
  error : boolean
}

  
  
// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export default class Login extends Component<{}, LoginState> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


  // Before the component mounts, we initialise our state
  componentWillMount() {


        this.setState({
            "username": "",
            password: "",
            session: null,
            error: false
        });
        var session : any = sessionStorage.getItem("session");
        session = session ? JSON.parse(session) : null; 
        if(session && session.token){
            //let history = useHistory();
            //history.push(ROUTES.MENU)
            this.setState({
                "username": session.id,
                password: "",
                session: session
            });
        }
  }
 
    onUsername = (event : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({"username" : event.currentTarget.value})
        console.log(event.currentTarget.value)
    }

    onPassword = (event : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({"password" : event.currentTarget.value})
    }

    onLoginCallback(history : any, result : boolean){
        if(result){
            history.push(ROUTES.MENU);
        }else{
            this.setState({"error" : true});
            //console.log("true error");
        }
    }

    onLogin = (history : any )  : void => {
        var myself = this;
        var loginRequest  :any = {
            "username"  :this.state.username,
            "password"  :this.state.password,
            "callback" : (result : boolean) => {myself.onLoginCallback(history,result)}
        }
        LoginService(loginRequest)
        //history.push("/menu")
    }




  // After the component did mount, we set the state each second.
  /*componentDidMount() {
    setInterval(() => this.tick(), 1000);
  }*/

  // render will know everything!
  render() {
    let myself = this;


    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
        <Header title="Ingresar"></Header>  
        <Row className="mt-5 justify-content-center ml-0 mr-0">
            <Col xs="12" sm ="8" md= "8" lg= "5">
            <Card className="p-5">
                <CardBody>         
                <CardTitle>
                    <h1 className="text-center">Ingresar</h1></CardTitle>
                    <small  className="text-muted text-center small_font">Para ingresar a este sitio debes tener una cuenta de grupo cultural o administrador</small>
                    <br/>
                    <FormLabel error={myself.state.error}>{myself.state.error && "usuario o contraseña incorrectos"}</FormLabel>
                    <input onChange={this.onUsername} value={this.state.username} className="login_input mb-3 mt-3" type="text" name="name" placeholder="Email"/>
                    <input onChange={this.onPassword} value={this.state.password}  className="login_input mb-3" type="password" name="password" placeholder="Contraseña"/>
                    <Route render={({ history}) => (
                        <button className="login_button" onClick={(event) =>{myself.onLogin(history)}}>Ingresar</button>
                    )} />
                </CardBody>
            </Card>
            </Col>
        </Row>
        

        </div>
    )
}
}