import React, { Component, Fragment } from 'react'; // let's also import Component
import {Col,Row,Container, Label} from 'reactstrap';
import Header from '../component/Header';
import { Route } from "react-router-dom";
import {getUsers,deleteUser} from '../services/user.services'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import {Button} from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ROUTES from '../config/routes';
import User from '../model/user.model'
import FormControl from '@material-ui/core/FormControl';
import {userSort} from '../component/userSort';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

type UserListState = {
  users: User[],
  search: string,
}

export default class UserList extends Component<{}, UserListState> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


  // Before the component mounts, we initialise our state
  componentWillMount() {
    //var username : any = localStorage.getItem("username");
      this.setState(
        {
          "users" : [],
          "search" :""
        }
        )
      getUsers(this.onUsersLoaded);
  }

  onUsersLoaded = (response : any) =>{
      console.log(response)
      var userList : User[] = [];
      if(response){
        response.forEach(
          (user : any) =>{
              userList.push(User.loadFromJson(user));
          }
        )
      }

      this.setState({"users" : userList});
  }

  setUser = (user: any) => { 
    //console.log(user)
    sessionStorage.setItem("user", JSON.stringify(user));
  }

  deleteUser = (user: any) => { 
    deleteUser(user.id, ()=>{});
  }

  handleFieldChange = (name : string) => ({target : {value }} : {target : { value:any }}) => {
    let newValue : any = value;
    let update : any = {};
    update[name] = newValue;
    console.log(newValue)
    this.setState(update)
  }
  
  //filter is updated on render
  onFilterChange = () : User[] =>{
      
    var filtered : User[] = []  
    if(this.state.users)
      filtered = userSort(
        this.state.search,
        this.state.users)
    return filtered;
  }


  render() {
    let myself = this;
    var filtered = this.onFilterChange();
    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
          <Header title="Administrar Usuarios" navigate={true}></Header> 
            <div className="blue_container container_100w pt-4 m-0">
              <label className="mr-3 ml-2">
              <label className="w6rem">
                Buscar
                <SearchIcon className="ml-2"></SearchIcon>
              </label>
            <FormControl className="ml-2">
              <TextField  
                className="menu_input"
                value={this.state.search}
                onChange={this.handleFieldChange("search")}
              />
            </FormControl>
            </label>
            </div>
            
            {this.state.users ?
              <List>
              {filtered.map(
                (user : any,index : number) =>{
                return (
                  <Row className="ml-0 mr-0 mb-2 p-2" style={{"backgroundColor":"#FFF"}}>
                  <Col md="4" >
                  <ListItem  key = {index} alignItems="flex-start">
                     <ListItemText 
                           primary={user.name}
                           secondary={user.id + " - " + user.location}/>
                  </ListItem >
                  </Col>
                  <Col md="3" >
                  <ListItem  key = {index} alignItems="flex-start">
                     <ListItemText 
                           primary={"numero : " + user.phone}/>
                  </ListItem >
                  </Col>
                  <Route render={({ history}) => (
                  <Col md="3"  className="my-auto">
                  
                  <Button variant="contained" color="primary" 
                    onClick={()=>{myself.setUser(user);history.push(ROUTES.VIEW_USER);}}>
                    Detalles
                  </Button>
  
                  </Col>
                  )} />
                  </Row>
                )   
                }
              )}
              </List>
              :
              <div></div>
            }
            
        </div>
        
    )
}
}