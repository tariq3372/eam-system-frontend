import { LoadingButton } from '@mui/lab'
import { Alert, Dialog, DialogContent, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import InputWrapper from '../InputWrapper'

const AddJobTitlesModal = ({ onClose }) => {
    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            jobTitleName: ''
        }
    })
    const [loading, setLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleAddJobTitle = (data) => {
        setLoading(data)
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
                    <Divider sx={{ mb: 3 }} />
                    <Stack direction='column' spacing={2} >
                        <InputWrapper error={errors?.jobTitleName?.message}>
                            <Controller
                                name="jobTitleName"
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <TextField
                                        {...rest}
                                        error={errors?.jobTitleName}
                                        label="Job Title Name"
                                    />
                                )}
                                rules={{
                                    required: { value: true, message: 'Required' }
                                }}
                            />
                        </InputWrapper>
                    </Stack>
                    <LoadingButton loading={loading} style={{ marginTop: '50px' }} variant="contained" onClick={handleSubmit(handleAddJobTitle)} >
                        Add JobTitle
                    </LoadingButton>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default AddJobTitlesModal