import React, { Component, Fragment } from 'react'; // let's also import Component
import Header from '../component/Header';
import Event from '../model/event.model';
import {getEventById} from '../services/event.service';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import SocialEvent from '../component/SocialEvent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import RegisterDialog from '../component/RegisterDialog';
import ROUTES from '../config/routes';
import { Route } from "react-router-dom";

type ViewEventState = {
  event : Event | undefined,
  assitanceOpen : boolean
}

type ViewEventProps = {
  match? : any
}

  

  
  
// Clock has no properties, but the current state is of type ClockState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export default class Login extends Component<ViewEventProps, ViewEventState> {


    constructor(props : any) { // does not compile in strict mode
        super(props)
        //load last used username
        
    }


  // Before the component mounts, we initialise our state
  componentWillMount() {
        this.setState({
            event : undefined,
            assitanceOpen : false
        });

        //console.log(this.props.match.params);
        const { event_id } = this.props.match.params;
        getEventById(event_id, this.onEventLoaded);
  }
 
  onEventLoaded = (rawEvent : any) =>{
    if(!rawEvent)return;
    console.log(rawEvent)
    var event : Event = Event.loadFromJson(rawEvent);
    this.setState({"event" : event});
  }

  handleAsistanceOpen = () => {
    this.setState({
      "assitanceOpen" : true
    })
  };

  handleAsistanceClose = () => {
    this.setState({
      "assitanceOpen" : false
    })
  };
        

  render() {
    let myself = this;
    

    return(
        <div className="gray" style={{"minHeight":"100vh"}}>
          <SocialEvent event={this.state.event}/>
          <Header title=" - Vista deEvento" navigate={true}></Header>
            
          <Container maxWidth="md">
          {this.state.event ? 
          <Card className="pr-4 pl-4 mt-2">
            <div className="date_flag">{formatDate(this.state.event.getDate())}</div>
            <CardMedia
              style={{
                height: 0,
                paddingTop: '56.25%', // 16:9
                marginTop: "-4rem",
                
              }}
              image={this.state.event.urlImgActivity}
              title="Event image"
              
            />
              <CardHeader
                title={this.state.event.name}
                className="mb-0"
              />
            <CardContent className="card_body mt-0 p-0">
              <Typography className="mt-0 pl-2 pr-2" variant="body2" color="textSecondary" component="p">
                { this.state.event.description }
              </Typography>
            </CardContent>

            <DialogActions className="mr-4">
              {this.state.event && this.state.event.assistance && 
              <Fragment>
                <Button onClick={() => {myself.handleAsistanceOpen()}} color="primary">
                  Registrarse
                </Button>
                <RegisterDialog event={this.state.event} assitanceOpen={this.state.assitanceOpen} handleAsistanceClose={myself.handleAsistanceClose} />
              </Fragment>
              }
              <Route render={({ history}) => (
                <Button onClick={() => {history.push(ROUTES.NEWS_FEED)}} color="primary" autoFocus> 
                  Cerrar
                </Button>
              )} />
            </DialogActions>
          </Card >
          :
          <CircularProgress />
        }
        </Container>
        </div>
    )
}
}

const months = ["ENE", "FEB", "MAR","ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
const formatDate = (date : Date) => {
  let formatted_date = date.getDate() + " " + months[date.getMonth()] 
  return formatted_date;
}

