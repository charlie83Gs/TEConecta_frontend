import React, { Component, Fragment } from 'react'; // let's also import Component
import {Col,Row,Container, Label} from 'reactstrap';
import Header from '../component/Header';
import { Route } from "react-router-dom";



export default class AdminUsers extends Component<{}, {}> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


  // Before the component mounts, we initialise our state
  componentWillMount() {
    //var username : any = localStorage.getItem("username");
        
  }


  render() {
    
    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
            <Header title="Administrar Usuarios"></Header> 
           
            
        </div>
        
    )
}
}