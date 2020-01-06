import React, { Fragment,Component } from 'react'; // we need this to make JSX compile
import Header from '../component/Header';
import { Route, Redirect } from "react-router-dom";
import Event from '../model/event.model';
import ROUTES from '../config/routes';
import {getAssitance} from '../services/event.service';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Col,Row} from 'reactstrap';
import Divider from '@material-ui/core/Divider';

type ParticipantsState = {
    participants: any,
    event: Event | undefined,
  }

  //TODO 
  //use origninal event key insted of 5df
  
export default class Participants extends Component<{}, ParticipantsState> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


  // Before the component mounts, we initialise our state
  componentWillMount() {
        var rawEvent = sessionStorage.getItem("event");
        var event : Event | undefined;
        if(rawEvent){
            event = Event.loadFromJson(JSON.parse(rawEvent));
            getAssitance(event.id,this.onRegisterLoaded)
            //getAssitance("5df",this.onRegisterLoaded)
        }

        this.setState({
            "event":event,
            "participants" : []
        })


  }

  onRegisterLoaded = (rawRegister: any) =>{
    console.log(rawRegister)
    this.setState({"participants" : rawRegister});
  }

  // render will know everything!
  //justify-content-md-center
  render() {
    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
            <Header title=" - Ver participantes" navigate={true}></Header> 
            <Row className="m-0 dark_blue white_text" >
            <Col xs="4">
              <h5>Nombre</h5>
            </Col>
            <Col xs="4">
              <h5>Carné</h5>
            </Col>
            <Col xs="4">
              <h5>Correo</h5>
            </Col>
            </Row>

            <List dense={false} className="mr-3 ml-3">
              
              {this.state.participants && this.state.participants.map(
                (participant : any, index : number) => {
                return (
                <Fragment>
                <ListItem key={index} className="participant_item">
                  <ListItemText
                    primary={participant.name }
                  />
                  <ListItemText
                    primary={participant.credential }
                  />
                  <ListItemText
                    primary={participant.email }
                  />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                </Fragment>
                )
                }
                )
              }
            </List>
            <Route render={() => {
            if (!this.state.event) {
              return <Redirect push to={ROUTES.MENU} />;
            }

            }}
            />
        </div>
        
    )
}
}