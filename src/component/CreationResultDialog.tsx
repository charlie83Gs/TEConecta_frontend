import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function CreationResultDialog({onAccept, resultado ,text , titleText , infoText} : ({onAccept : any,resultado: boolean, text:string,titleText: string, infoText:string})) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button className="mr-4 green teconecta_button mid_lenght" variant="contained"  onClick={() =>{if(resultado) handleClickOpen()}}>
        {text}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titleText}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {infoText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleClose(); if(onAccept) onAccept()}} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}