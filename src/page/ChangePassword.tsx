import React, { Component, Fragment } from 'react'; // let's also import Component
import {Col,Row,Container} from 'reactstrap';
import Header from '../component/Header';
import { Route, Redirect } from "react-router-dom";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

import {getUser,updateUser,updateUserPassword} from "../services/user.services"
import URLS from '../config/urls';
import ROUTES from '../config/routes';
import { FormLabel } from '@material-ui/core';
import User from '../model/user.model';


// the clock's state has one field: The current time, based upon the
// JavaScript class Date
type ChangePasswordState = {
  password : string,
  passwordConfirmation : string,
  session : any,
  error : boolean,
  changed : boolean,
}

  
  
// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export default class ChangePassword extends Component<{}, ChangePasswordState> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


  // Before the component mounts, we initialise our state
  componentWillMount() {


        this.setState({
            password: "",
            passwordConfirmation: "",
            session : undefined,
            error : false,
            changed : false
        });
        var session : any = sessionStorage.getItem("session");
        session = session ? JSON.parse(session) : null; 
        if(session && session.token){
            //let history = useHistory();
            //history.push(ROUTES.MENU)
            this.setState({
                "password": "",
                passwordConfirmation: "",
                session: session,
                error : false
            });
        }
    }
 

    onPassword = (event : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({"password" : event.currentTarget.value})
    }

    onPasswordConfirmation = (event : React.ChangeEvent<HTMLInputElement>) => {
        this.setState({"passwordConfirmation" : event.currentTarget.value})
    }

    onLoginCallback(history : any, result : boolean){
        if(result){
            history.push(ROUTES.MENU);
        }else{
            this.setState({"error" : true});
            //console.log("true error");
        }

        
    }

    

    onChangePassword = () =>{
        if(this.state.password != this.state.passwordConfirmation){
            this.setState({"error" : true});
            return;
        }
        this.setState({"error" : false});
        getUser(this.state.session.id, this.onUserRetrieved );
        //history.push("/menu")
    } 

    onUserRetrieved = (user : any) =>{
        console.log(user);
        var userInfo : User = User.loadFromJson(user);
        userInfo.password = this.state.password;
        //user.id = 'FEITEC'
        updateUserPassword(userInfo, this.onUserUpdated)

    }

    onUserUpdated = (result : any) => {
        console.log(result);
        this.setState({changed : true})
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
        <Header title=" - Cambiar Contraseña" navigate={true}></Header>  
        <Row className="mt-5 justify-content-center ml-0 mr-0">
            <Col xs="12" sm ="8" md= "8" lg= "5">
            <Card className="p-5">
                <CardBody>         
                <CardTitle>
                    <h1 className="text-center">Cambiar contraseña</h1></CardTitle>
                    <small  className="text-muted text-center small_font">En esta pantalla puedes cambiar tu contraseña</small>
                    <br/>
                    <FormLabel error={myself.state.error}>{myself.state.error && "Las contraseñas no coinciden"}</FormLabel>
                    <input onChange={this.onPassword} value={this.state.password} className="login_input mb-3 mt-3" type="password" name="password" placeholder="Contraseña"/>
                    <input onChange={this.onPasswordConfirmation} value={this.state.passwordConfirmation}  className="login_input mb-3" type="password" name="password" placeholder="Repite Tu Contraseña"/>

                    <button className="login_button" onClick={(event) =>{myself.onChangePassword()}}>Ingresar</button>

                </CardBody>
            </Card>
            </Col>
        </Row>
        
        
        {!this.state.session && <Redirect to={ROUTES.NEWS_FEED}/>}
        {this.state.changed && <Redirect to={ROUTES.MENU}/>}
        
        
        </div>
    )
}
}

//{this.state.changed && <Redirect to={ROUTES.MENU}/>}