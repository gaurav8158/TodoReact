import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as yup from "yup";
import { Button, FormHelperText, InputLabel, TextField, TextareaAutosize } from "@mui/material";
import { useDispatch } from "react-redux";
import { createTodo } from "./Redux/Todoslice";
import FormControl from "@mui/material/FormControl";

const validationSchema = yup.object({
  task: yup.string().required("task is required"),
  isComplete: yup.string().required("Please select an option"),
  description: yup.string().required("feild is required"),
});

const initialValues = {
  task: "",
  isComplete: "",
  description: "",
  date: "",
};

const Formtodo = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { resetForm }) => {
    const currentDateTime = new Date();

    const options = {
      weekday: "short",
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
      currentDateTime
    );
    values.date = formattedDateTime;
    dispatch(createTodo(values));
    //  console.log(values);
    resetForm();
  };
  const options = [
    { value: "Not Completed", label: "Not Completed" },
    { value: "Pending", label: "Pending" },
    { value: "Completed", label: "Completed" },
  ];
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => {
        return (
          <Form type="submit" className="todo-form">
            <Field
              as={TextField}
              label="task"
              type="name"
              name="task"
              fullWidth
              variant="outlined"
              margin="dense"
              helperText={<ErrorMessage name="task" />}
              error={formik.errors.task && formik.touched.task}
            />

            <FormControl fullWidth variant="outlined" >
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Field
                as={Select}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="isComplete"
                placeholder="Status"
                label="Status"
                error={formik.errors.isComplete && formik.touched.isComplete}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
              {formik.errors.isComplete && formik.touched.isComplete && (
                <FormHelperText error>{formik.errors.isComplete}</FormHelperText>
              )}
            </FormControl>

            <Field
              as={TextField}
              id="outlined-multiline-flexible"
              label="decription"
              multiline
              maxRows={4}
              name="description"
              variant="outlined"
              margin="dense"
              helperText={<ErrorMessage name="description" />}
              error={formik.errors.description && formik.touched.description}
            />

            <Button type="submit" variant="outlined">
              Add todo
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Formtodo;

// <Field
// as={Select}
// placeholder="isComplete"
// type="text"
// name="isComplete"
// variant="outlined"
// margin="dense"
// helperText={<ErrorMessage name="isComplete" />}
// error={formik.errors.isComplete && formik.touched.isComplete}
// required
// >
// <MenuItem value="Not Completed">Not Completed</MenuItem>
// <MenuItem value="Pending">Pending</MenuItem>
// <MenuItem value="Completed">Completed</MenuItem>
// </Field>

{
  /* <Field
as={Select}
name="selectedOption"
placeholder="Select an option"
label="Select an option"
variant="outlined"
margin="dense"
error={
  formik.touched.isComplete && Boolean(formik.errors.isComplete)
}
// helperText={<ErrorMessage name="isComplete" />}
 helperText={formik.touched.isComplete && formik.errors.isComplete}
>
{options.map((option) => (
  <MenuItem key={option.value} value={option.value}>
    {option.label}
  </MenuItem>
))}
</Field>  */
}
