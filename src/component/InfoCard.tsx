import React,{Fragment} from 'react'; // we need this to make JSX compile
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
type CardProps = {
  Contenido : String,
  titulo: string
}

const InfoCard = 
({ Contenido, titulo}: CardProps) => {
        const [open, setOpen] = React.useState(false);
       
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
                style={{whiteSpace:"pre-line", textAlign :"center"}}>
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