import React,{Fragment} from 'react'; // we need this to make JSX compile
import {Col,Media} from 'reactstrap';
import Paper from "@material-ui/core/Paper";
import { Card } from '@material-ui/core';
import Event from '../model/event.model';
import Helmet from 'react-helmet';
import URLS from '../config/urls'
import ROUTES from '../config/routes'

type SocialEventProps= {
    event? : Event,
}

//this component provides importand metadata for social network
//based on https://css-tricks.com/essential-meta-tags-social-media/
//using helmet to inject tags on the header of the website
const SocialEvent = 
({ event }: SocialEventProps) => {
        return(
            <Fragment>
                {event && 
                    <Helmet  defer={false}> 
                        <meta name="fragment" content="!"></meta>
                        <meta property="og:title" content={event.name}/>
                        <meta property="og:description" content={event.description}/>
                        <meta property="og:image" content={event.urlImgActivity}/>
                        <meta name="twitter:card" content="summary_large_image"/>
                    </Helmet>
                }
            </Fragment>
            
        )  
    }


export default SocialEvent;


//<meta property="og:url" content={URLS.DOMAIN + ROUTES.VIEW_EVENT +"/"+ event.id}/>
