import React,{Fragment} from 'react'; // we need this to make JSX compile
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {TextField, Typography} from '@material-ui/core';
import {registerInEvent} from '../services/event.service';
import Event from '../model/event.model'

type RegisterCardProps = {
    event : Event,
    assitanceOpen:boolean,
    handleAsistanceClose : Function
  }
  
const RegisterDialog = ({event,assitanceOpen,handleAsistanceClose} : RegisterCardProps) =>{
    const [name, setName] = React.useState("");
    const [ident, setId] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [open, setOpen] = React.useState(false);
       
        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
  
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
          <Button onClick={() => {registerInEvent(event,name,ident,email,()=>{console.log("done")});handleClickOpen();}} color="primary" autoFocus> 
            Registrarse
          </Button>
          <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="infp-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Registro"}</DialogTitle>
              <DialogContent>
              <Typography className="mt-0 pl-2 pr-2" variant="body2" color="textSecondary"  
                style={{whiteSpace:"pre-line", textAlign :"center"}}>
                {"Se realizo exitosamente el registro a la actividad."}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {handleAsistanceClose()}} color="primary" autoFocus>
                  Volver
                </Button>
              </DialogActions>
            </Dialog>
          <Button onClick={() => {handleAsistanceClose();}} color="primary" autoFocus> 
            Cancelar
          </Button>
        </DialogActions>
  
        </Dialog>
      )
  }
  
  export default RegisterDialog;