import React, { useState } from 'react';
import { Dialog, DialogContent, Stack, Typography, TextField, Divider, MenuItem, AlertTitle } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from 'react-hook-form';
import InputWrapper from '../../components/InputWrapper';
import { EMAIL_REGEX } from '../../helpers';
import { Alert } from '@mui/material';

const AddEmployeeModal = ({ onClose }) => {
    const { control, reset, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            fname: '',
            lName: '',
            gender: '',
            contact_add: '',
            emp_email: '',
        }
    });
    const [loading, setLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleAddEmployee = (data) => {
        setLoading(true);
    };

    return (
        <Dialog
            onClose={onClose}
            open={true}
            fullWidth={true}
            maxWidth={"sm"}
        >
            {showSuccessAlert &&
                <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
                    <AlertTitle>Success</AlertTitle>
                    Your request processed successfully.
                </Alert>
            }
             {showErrorAlert &&
                <Alert severity="error" onClose={() => setShowErrorAlert(false)}>
                    <AlertTitle>Error</AlertTitle>
                    Something went wrong, Please try again later.
                </Alert>
            }
            <DialogContent>
                <Stack direction='column' spacing={3}>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>Add New Employee</Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Stack direction='column' spacing={2}>
                        {/* 1 */}
                        <InputWrapper error={errors?.fname?.message}>
                            <Controller
                                name="fname"
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <TextField
                                        {...rest}
                                        error={errors?.fname}
                                        label="First Name"
                                    />
                                )}
                                rules={{
                                    required: { value: true, message: "Required" },
                                }}
                            />
                        </InputWrapper>
                        <InputWrapper error={errors?.lName?.message}>
                            <Controller
                                name="lName"
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <TextField
                                        {...rest}
                                        error={errors?.lName}
                                        label="Last Name"
                                    />
                                )}
                                rules={{
                                    required: { value: true, message: "Required" },
                                }}
                            />
                        </InputWrapper>
                        <InputWrapper error={errors?.gender?.message}>
                            <Controller
                                name="age"
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <TextField
                                        {...rest}
                                        select
                                        label="Gender"
                                        placeholder='Select Gender'
                                    >
                                        <MenuItem key={"MALE"} value={"MALE"}>Male</MenuItem>
                                        <MenuItem key={"FEMALE"} value={"FEMALE"}>Female</MenuItem>
                                    </TextField>
                                )}
                                rules={{
                                    required: { value: true, message: "Required" },
                                }}
                            />
                        </InputWrapper>
                        <InputWrapper error={errors?.age?.message}>
                            <Controller
                                name="age"
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <TextField
                                        {...rest}
                                        type="number"
                                        error={errors?.age}
                                        label="Age"
                                    />
                                )}
                                rules={{
                                    required: { value: true, message: "Required" },
                                }}
                            />
                        </InputWrapper>
                        <InputWrapper error={errors?.contact_add?.message}>
                            <Controller
                                name="contact_add"
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <TextField
                                        {...rest}
                                        error={errors?.contact_add}
                                        label="Address"
                                    />
                                )}
                                rules={{
                                    required: { value: true, message: "Required" },
                                }}
                            />
                        </InputWrapper>
                        <InputWrapper error={errors?.emp_email?.message}>
                            <Controller
                                name="emp_email"
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <TextField
                                        {...rest}
                                        error={errors?.emp_email}
                                        label="Email"
                                    />
                                )}
                                rules={{
                                    required: { value: true, message: "Required" },
                                    pattern: { value: EMAIL_REGEX, message: "Invalid Email!" }
                                }}
                            />
                        </InputWrapper>
                    </Stack>
                    {/* Button */}
                    <LoadingButton loading={loading} style={{ marginTop: '50px' }} variant="contained" onClick={handleSubmit(handleAddEmployee)} >
                        Add Employee
                    </LoadingButton>
                </Stack>
            </DialogContent>
        </Dialog>
    );
};

export default AddEmployeeModal;