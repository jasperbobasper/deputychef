import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const AlertDeleteRecipe = ({open, setOpen, handleDelete}) => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Recipe?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Go Back</Button>
            <Button onClick={handleDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default AlertDeleteRecipe;