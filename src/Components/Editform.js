import React, { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo } from "./Redux/Todoslice";

const Editform = ({ id, task, isComplete }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const { todo, loading } = useSelector((state) => state.app);

 const [updateData, setUpdateData] = useState();

  useEffect(() => {
    if (id) {
      const singleTodo = todo.filter((ele) => ele.id === id);
      setUpdateData(singleTodo[0]);
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const newData = (e) => {
   setUpdateData({ ...updateData, ["task"]: e.target.value});
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTodo(updateData));
    handleClose();
  };
  const handleoption = (e) => {
    setUpdateData({ ...updateData, ["isComplete"]: e.target.value });
  };
  const newDescription =(e)=>{
    setUpdateData({ ...updateData, ["description"]: e.target.value});
  }
  return (
    <>
      <ModeEditIcon onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h3>Edit task :</h3>
          <form className="form-edit" onSubmit={handleUpdate}>
            <TextField
              label="Task"
              variant="outlined"
              type="text"
              onChange={newData}
              value={updateData && updateData.task}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={updateData && updateData.isComplete}
                label="status"
                onChange={handleoption}
              >
                <MenuItem value="Not Completed">Not Completed</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
            <TextField
              placeholder="Description"
              multiline
             
              onChange={newDescription}
              value={updateData && updateData.description}
            />
            <Button variant="outlined" type="submit">
              SUBMIT
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Editform;
