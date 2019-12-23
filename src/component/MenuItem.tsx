import React from 'react'; // we need this to make JSX compile
import {Col,Media} from 'reactstrap';
import Paper from "@material-ui/core/Paper";
import { Card } from '@material-ui/core';

type MenuItemProps = {
  title: string,
  icon: any,
  onClick : Function
}

const MenuItem = 
({ title,icon, onClick }: MenuItemProps) => {
        return(
        
        <Col md="11" lg="4" className="mb-4 text-center" 
            style={{"paddingLeft":"5rem","paddingRight":"5rem"}}>
            <Card className="menu_item" onClick={()=>{onClick()}}>
                <h5 className="menu_item_header mb-0">{  title }</h5>
                <Media body middle src={icon} style={{"height":"9.5rem","width":"9.5rem"}}/>
                <div className="bar mb-0 light_blue "></div>
            </Card>
            
        </Col>
        )  
    }

    interface LoginProps {
    
    }

export default MenuItem;