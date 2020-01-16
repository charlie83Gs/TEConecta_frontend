import React, { Component, Fragment } from 'react'; // let's also import Component
import {Button} from '@material-ui/core';
import Event from '../model/event.model';
import FacebookIcon from '@material-ui/icons/Facebook';
import URLS , {getShareUrl,getEventUrl} from '../config/urls'
import { Route, Redirect } from "react-router-dom";
import ROUTES from '../config/routes';




type ShareButtonProps = {
  event: Event,

}

const ShareButton = 
({ event }: ShareButtonProps) => {

        return(
            <Route render={({ history}) => (
                <Button className="ml-2" variant="contained" color="primary" onClick={()=>{preRender(event, history)}}>
                    <FacebookIcon className="mr-1"></FacebookIcon>
                    Compartir
                </Button>
            )} />

        )  
    }



export default ShareButton;


const preRender= (event : Event, history : any) =>{
    //var newPageHandle : any = window.open(getEventUrl( event.id ));
    history.replace(ROUTES.VIEW_EVENT_NO_HANDLE + "/" + event.id );
    setTimeout(function(){ afterRender(event,history) }, 2000);
  }

const afterRender = (event : Event , history : any) =>{
    window.open(getShareUrl( event.id ));
    history.replace(ROUTES.ADMIN_EVENT);

}
