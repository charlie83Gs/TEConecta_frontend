import React,{Fragment} from 'react'; // we need this to make JSX compile
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {TextField} from '@material-ui/core';
import {registerInEvent} from '../services/event.service';

import Event from '../model/event.model'

type CardProps = {
  Contenido : String,
  titulo: string
}

const InfoCard = 
({ Contenido, titulo}: CardProps) => {
        const [open, setOpen] = React.useState(false);
        const [assitanceOpen, setAssistanceOpen] = React.useState(false);
       
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
              
        //console.log(event)
        return(
            <Fragment>
            <a  className="blue-text text-lighten-4 right"  onClick={handleClickOpen}>
              {titulo}
            </a>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="infp-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
              <DialogContent>
                <Typography className="mt-0 pl-2 pr-2" variant="body2" color="textSecondary"  
                style={{ display: "flex", justifyContent: "space-between"}}>
                {Contenido}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {handleClose()}} color="primary" autoFocus>
                  Volver
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>
        )  
    }

    
export default InfoCard;

