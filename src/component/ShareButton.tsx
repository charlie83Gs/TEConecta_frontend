import React, { Component, Fragment } from 'react'; // let's also import Component
import {Button} from '@material-ui/core';
import Event from '../model/event.model';
import FacebookIcon from '@material-ui/icons/Facebook';
import {getShareUrl} from '../config/urls'


type ShareButtonProps = {
  event: Event,

}

const ShareButton = 
({ event }: ShareButtonProps) => {
        return(
        <a target="_blank" 
                href={getShareUrl( event.id )} 
                className="fb-xfbml-parse-ignore">
            <Button className="ml-2" variant="contained" color="primary" >
                <FacebookIcon className="mr-1"></FacebookIcon>
                Compartir
            </Button>
        </a>
        )  
    }



export default ShareButton;