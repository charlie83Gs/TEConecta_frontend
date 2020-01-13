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
  event : Event
}

const NewCard = 
({ event}: CardProps) => {
        const [open, setOpen] = React.useState(false);
        const [assitanceOpen, setAssistanceOpen] = React.useState(false);
       
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };

        const handleAsistanceOpen = () => {
          setAssistanceOpen(true);
        };

        const handleAsistanceClose = () => {
          setAssistanceOpen(false);
        };
              
              
        //console.log(event)
        return(
        <Fragment>
        <Grid item xs={11} md={4} >
        <CardActionArea onClick={()=>{console.log("clicked");handleClickOpen()}}>
        <Card className="pr-2 pl-2">
          <div className="date_flag">{formatDate(event.getDate())}</div>
            <CardMedia
              style={{
                height: 0,
                paddingTop: '56.25%', // 16:9
                marginTop: "-4rem",
                
              }}
              image={event.urlImgActivity}
              title="Event image"
              
            />
              <CardHeader
                title={event.name}
                className="mb-0"
              />
            <CardContent className="card_body mt-0 p-0">
              <Typography className="mt-0 pl-2 pr-2" variant="body2" color="textSecondary" component="p">
                { event.description }
              </Typography>
            </CardContent>
        </Card >
        </CardActionArea>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
      >
        <div className="date_flag" >{formatDate(event.getDate())}</div>
        <DialogContent style={{marginTop:"-5rem"}}>

            <CardContent style={{marginLeft:"4rem"}}className=" mt-0 mb-0 p-0">
              <Typography className="mt-0 pl-2 pr-2" variant="body2" color="textSecondary" component="p">
                { event.timeI + " hasta " + event.timeF }
              </Typography>
            </CardContent>

            <CardMedia
              style={{
                height: 0,
                paddingTop: '56.25%', // 16:9

                
              }}
              image={event.urlImgActivity}
              title="Event image"
              className="mt-0"
              
            />
              <CardHeader
                title={event.name}
                className="mb-0"
              />
              <Grid container spacing={3}
                alignItems="center"
              >
                  <Grid item xs={5} >
                    <AccountCircleIcon style={{ fontSize: 40 }}/>
                    <label className="my-auto ml-1">{event.owner}</label>
                  </Grid>
                  <Grid item xs={6} >
                    <label className="my-auto mr-5"><b>Sede:</b>{ " "+ event.location}</label>
                    {event.assistance && <label className="my-auto "><b>Cupo:</b>{ " "+ event.space}</label>}
                    <br/>
                    <label className="my-auto "><b>Ubicacion:</b>{ " "+ event.place}</label>
                    
                  </Grid>
              </Grid>
            <CardContent className="card_body mt-0 p-0">
              <Typography className="mt-1 pl-2 pr-2" variant="body2" color="textSecondary" component="p">
                { event.description }
              </Typography>
            </CardContent>


        </DialogContent>
        <DialogActions className="mr-4">
          {event.assistance && 
          <Fragment>
            <Button onClick={() => {handleAsistanceOpen()}} color="primary">
              Registrarse
            </Button>
            <RegisterDialog event={event} assitanceOpen={assitanceOpen} handleAsistanceClose={handleAsistanceClose} />
          </Fragment>
          }
          <Button onClick={() => {handleClose();}} color="primary" autoFocus> 
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

    </Fragment>
        )  
    }

    
export default NewCard;



type RegisterCardProps = {
  event : Event,
  assitanceOpen:boolean,
  handleAsistanceClose : Function
}

const RegisterDialog = ({event,assitanceOpen,handleAsistanceClose} : RegisterCardProps) =>{
  const [name, setName] = React.useState("");
  const [ident, setId] = React.useState("");
  const [email, setEmail] = React.useState("");
  

  return (
    <Dialog
    open={assitanceOpen}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    fullWidth={true}
    >
      <DialogTitle id="alert-dialog-title">{"Registrarse a " + event.name}</DialogTitle>
        <DialogContent className="ml-4">
        <label className="w6rem"> Nombre</label>
        <TextField 
          className="menu_input"
          value={name}
          onChange={(event) =>{setName(event.target.value)}}
        />
        <div/>
        <label className="w6rem"> Carné</label>
        <TextField 
          className="menu_input"
          value={ident}
          onChange={(event) =>{setId(event.target.value)}}
        />
         <div/>
        <label className="w6rem"> Email </label>
        <TextField 
          className="menu_input"
          value={email}
          onChange={(event) =>{setEmail(event.target.value)}}
        />
        </DialogContent>
        <DialogActions className="mr-4">
        <Button onClick={() => {handleAsistanceClose(); registerInEvent(event,name,ident,email,()=>{console.log("done")})}} color="primary" autoFocus> 
          Registrarse
        </Button>
        <Button onClick={() => {handleAsistanceClose();}} color="primary" autoFocus> 
          Cancelar
        </Button>
      </DialogActions>

      </Dialog>
    )
}





//converts date to the required display format
const months = ["ENE", "FEB", "MAR","ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
const formatDate = (date : Date) => {
  let formatted_date = date.getDate() + " " + months[date.getMonth()] 
  return formatted_date;
}

