import React,{Fragment} from 'react'; // we need this to make JSX compile
import {Col,Media} from 'reactstrap';
import Paper from "@material-ui/core/Paper";
import { Card } from '@material-ui/core';
import Event from '../model/event.model';
import Helmet from 'react-helmet';

type SocialEventProps= {
    event? : Event,
}

//this component provides importand metadata for social network
const SocialEvent = 
({ event }: SocialEventProps) => {
        return(
            <Fragment>
                {event && 
                    <Helmet>
                        <meta property="og:title" content={event.name}/>
                        <meta property="og:description" content={event.description}/>
                        <meta property="og:image" content={event.urlImgActivity}/>
                        <meta name="twitter:card" content="summary_large_image"/>
                    </Helmet>
                }
            </Fragment>
            
        )  
    }

    interface LoginProps {
    
    }

export default SocialEvent;