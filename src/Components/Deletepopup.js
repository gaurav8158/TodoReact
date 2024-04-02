import  { useState } from 'react'
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useDispatch } from 'react-redux';
import { deleteTodo } from './Redux/Todoslice';

const Deletepopup = ({setShow,id ,click ,setClick}) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const dispatch = useDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleDelete = () => {
      dispatch(deleteTodo(id));
      setClick(true);
      setShow(true);
        handleClose();
      };
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
  return (
    <div>
      <DeleteForeverOutlinedIcon onClick={handleClickOpen} />
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
         Your task details will delete permanantly.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Deletepopup