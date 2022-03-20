import React, { useState } from 'react';
import { Dialog, DialogContent, Stack, Typography, TextField, Divider, MenuItem, AlertTitle } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from 'react-hook-form';
import InputWrapper from '../InputWrapper';
import { EMAIL_REGEX } from '../../helpers';
import { Alert } from '@mui/material';
import { addEmployeeApi, updateEmployeeApi } from '../../api';

const AddEditEmployeeModal = ({ onClose, onRefreshData, item }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            fName: item?.fName || '',
            lName: item?.lName || '',
            gender: item?.gender || '',
            age: item?.age || '',
            contactAdd: item?.contactAdd || '',
            email: item?.email || '',
            password: item?.password || ''
        }
    });

    const isEdit = item ? true : false;
    const [loading, setLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const handleAddEmployee = (data) => {
        setLoading(true);
        if (isEdit) {
            updateEmployeeApi(item?._id, data, (res) => {
                setLoading(false);
                if (res.data) {
                    onRefreshData();
                } else {
                    setShowErrorAlert(true);
                };
            });
        } else {
            addEmployeeApi(data, (res) => {
                setLoading(false);
                if (res.data) {
                    onRefreshData();
                } else {
                    setShowErrorAlert(true);
                };
            });
        };
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
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>{isEdit ? "Update Employee" : "Add New Employee"}</Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Stack direction='column' spacing={2}>
                        {/* 1 */}
                        <InputWrapper error={errors?.fName?.message}>
                            <Controller
                                name="fName"
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <TextField
                                        {...rest}
                                        error={errors?.fName}
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
                                name="gender"
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
                        <InputWrapper error={errors?.contactAdd?.message}>
                            <Controller
                                name="contactAdd"
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <TextField
                                        {...rest}
                                        error={errors?.contactAdd}
                                        label="Address"
                                    />
                                )}
                                rules={{
                                    required: { value: true, message: "Required" },
                                }}
                            />
                        </InputWrapper>
                        <InputWrapper error={errors?.email?.message}>
                            <Controller
                                name="email"
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <TextField
                                        {...rest}
                                        error={errors?.email}
                                        label="Email"
                                    />
                                )}
                                rules={{
                                    required: { value: true, message: "Required" },
                                    pattern: { value: EMAIL_REGEX, message: "Invalid Email!" }
                                }}
                            />
                        </InputWrapper>
                        {!isEdit &&
                            <InputWrapper error={errors?.password?.message}>
                                <Controller
                                    name="password"
                                    control={control}
                                    render={({ field: { ref, ...rest } }) => (
                                        <TextField
                                            {...rest}
                                            error={errors?.password}
                                            label="Password"
                                        />
                                    )}
                                    rules={{
                                        required: { value: true, message: "Required" },
                                        minLength: { value: 8, message: "Length should contain 8-20" },
                                        maxLength: { value: 20, message: "Length should contain 8-20" },
                                    }}
                                />
                            </InputWrapper>
                        }
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

export default AddEditEmployeeModal;