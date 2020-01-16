import React, { Fragment } from 'react'; // we need this to make JSX compile
import {Col,Media} from 'reactstrap';
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {Grid}from '@material-ui/core';
import User from '../model/user.model';
import Header from '../component/Header';

type MenuItemProps = {

}

const ViewUser = 
({  }: MenuItemProps) => {
        var rawUser = sessionStorage.getItem("user");
        var user : User | undefined; 
        if(rawUser){
            user = User.loadFromJson(JSON.parse(rawUser));
        }
        console.log(user)
        return(
            <div className="gray" style={{"minHeight":"100vh"}}>
            <Header title=" - Ver usuario" navigate={true}></Header> 
            <Grid container spacing={6}
                    alignItems="center"
                    justify="center"
                >
            <Grid item xs={11} md={6} >
            <Card className="mt-3">
            {user &&
            <Fragment>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  {user.name[0]}
                </Avatar>
              }
       
              title={user.name}
              subheader={user.location}
            />
            <label>
            <Avatar className="ml-3" src={user.urlImageProfile} style={{width:"10rem",height:"10rem"}}/>
            </label>
            <label className="ml-4" style={{top:"-3rem" ,position:"relative"}}>
            <Typography  className="d-inline" variant="body2" color="textSecondary" component="p">
                <b>Telefono:</b>{  "  " + user.phone}
            </Typography>
            <br/>
            <Typography  className="d-inline" variant="body2" color="textSecondary" component="p">
                <b>Correo:</b>{  "  " + user.id}
            </Typography>
            <br/>
            <Typography  className="d-inline" variant="body2" color="textSecondary" component="p">
                <b>Encargado:</b>{  "  " + user.manager}
            </Typography>
            </label>
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {user.description}
              </Typography>
              </CardContent>
              </Fragment>
              }
              </Card>
              </Grid>
              </Grid>
              </div>
        )  
    }

    interface LoginProps {
    
    }

export default ViewUser;