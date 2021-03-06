import { LoadingButton } from "@mui/lab";
import { Alert, Dialog, DialogContent, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { addDepartmentApi, updateDepartmentApi } from "../../api";
import InputWrapper from "../InputWrapper";

const AddEditDepartmentModal = ({ onClose, onRefreshData, item }) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      departmentName: item?.departmentName || ''
    }
  })
  const isEdit = item ? true : false;
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleAddDepartment = (data) => {
    setLoading(true);
    if (isEdit) {
      updateDepartmentApi( item?._id, data, (res) => {
        setLoading(false);
        if(res.data) {
          onRefreshData();
        }
        else {
          showErrorAlert(true);
        }
      })
    }
    else {
      addDepartmentApi(data, (res) => {
        setLoading(false);
        if(res.data) {
          onRefreshData();
        }
        else {
          setShowErrorAlert(true)
        }
      })
    }
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
          <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}> {isEdit ? "Update Department" : "Add Department" }  </Typography>
          <Divider sx={{ mb: 3 }} />
          <Stack direction='column' spacing={2} >
            <InputWrapper error={errors?.departmentName?.message}>
              <Controller
                name="departmentName"
                control={control}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    {...rest}
                    error={errors?.departmentName}
                    label="Department Name"
                  />
                )}
                rules={{
                  required: { value: true, message: 'Required' }
                }}
              />
            </InputWrapper>
          </Stack>
          <LoadingButton loading={loading} style={{ marginTop: '50px' }} variant="contained" onClick={handleSubmit(handleAddDepartment)} >
            { isEdit ? "Update Department" : "Add Department"}
          </LoadingButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditDepartmentModal;