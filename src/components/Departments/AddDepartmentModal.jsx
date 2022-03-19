import { LoadingButton } from "@mui/lab";
import { Alert, Dialog, DialogContent, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputWrapper from "../InputWrapper";

const AddDepartmentModal = ({ onClose }) => {
  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      departmentName: ''
    }
  })
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const handleAddDepartment = (data) => {
    setLoading(true);
  }

  return (
    <Dialog
    onClose={onClose}
    open={true}
    fullWidth={true}
    maxWidth={"sm"}
    >
      {showSuccessAlert &&
        <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
          Your request processed successfully.
        </Alert>
      }
      {showErrorAlert &&
        <Alert severity="error" onClose={() => setShowErrorAlert(false)}>
          Something went wrong, Please try again later.
        </Alert>
      }
      <DialogContent>
        <Stack direction='column' spacing={3}>
          <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }} Add Department> </Typography>
              <Divider sx= {{ mb: 3 }} />
              <Stack direction='column' spacing={2} >
                <InputWrapper error={errors?.departmentName?.message}>
                  <Controller
                      name="departmentName"
                      control={control}
                      render={({ field: { ref, ...rest } }) => (
                        <TextField
                            {...rest}
                            error={errors?.departmentName}
                            label= "Department Name"
                        />
                      )}
                      rules={{
                        required: { value: true, message: 'Required' }
                      }}
                  />
                </InputWrapper>
              </Stack>
              <LoadingButton loading={loading} style={{ marginTop: '50px' }} variant="contained" onClick={handleSubmit(handleAddDepartment)} >
                Add Department
              </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddDepartmentModal;