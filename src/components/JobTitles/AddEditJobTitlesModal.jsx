import { LoadingButton } from '@mui/lab'
import { Alert, Dialog, DialogContent, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { addJobTitleApi, getDepartmentListApi, updateJobTitleApi } from '../../api'
import InputWrapper from '../InputWrapper'

const AddEditJobTitlesModal = ({ onClose, onRefreshData, item }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            jobTitle: item?.jobTitle || '',
            deptId: item?.departmentName || '',
        }
    })
    const isEdit = item ? true : false;
    const [loading, setLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [departmentList, setDepartmentList] = useState([]);
    const [departmentLoading, setDepartmentLoading] = useState(true);

    const handleAddJobTitle = (data) => {
        setLoading(true);
        if (isEdit) {
            updateJobTitleApi(item?._id, data, (res) => {
                setLoading(false);
                if (res.data) {
                    onRefreshData();
                }
                else {
                    showErrorAlert(true);
                }
            })
        }
        else {
            addJobTitleApi(data, (res) => {
                setLoading(false);
                if (res.data) {
                    onRefreshData();
                }
                else {
                    setShowErrorAlert(true);
                }
            })
        }
    }

    useEffect(() => {
        getDepartmentListApi((res => {
            setDepartmentLoading(false);
            if (res.data) {
                console.log("data", res.data.result);
                setDepartmentList(res.data.result);
            }
            else {
                console.log("getDepartmentListApi error");
            }
        }))
    }, [])


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
                    <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}> {isEdit ? "Update Job Title" : "Add Job Title"}  </Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Stack direction='column' spacing={2} >
                        <InputWrapper error={errors?.jobTitle?.message}>
                            <Controller
                                name="jobTitle"
                                control={control}
                                render={({ field: { ref, ...rest } }) => (
                                    <TextField
                                        {...rest}
                                        error={errors?.jobTitle}
                                        label="Job Title"
                                    />
                                )}
                                rules={{
                                    required: { value: true, message: 'Required' }
                                }}
                            />
                        </InputWrapper>
                        {!isEdit &&
                            <InputWrapper error={errors?.deptId?.message}>
                                <Controller
                                    name="deptId"
                                    control={control}
                                    render={({ field: { ref, ...rest } }) => (
                                        <TextField
                                            {...rest}
                                            select
                                            label="Department Name"
                                            placeholder="Select Department"
                                            disabled={!departmentList?.length || departmentLoading}
                                        >
                                            {departmentList?.map((item, index) => (
                                                <MenuItem key={index} value={item._id}>{item.departmentName}</MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                    rules={{
                                        required: { value: true, message: 'Required' }
                                    }}
                                />
                            </InputWrapper>
                        }
                    </Stack>
                    <LoadingButton loading={loading} style={{ marginTop: '50px' }} variant="contained" onClick={handleSubmit(handleAddJobTitle)} >
                        {isEdit ? "Update Job Title" : "Add Job Title"}
                    </LoadingButton>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default AddEditJobTitlesModal;