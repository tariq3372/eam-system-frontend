import { Dialog, DialogContent, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import InputWrapper from '../InputWrapper'

const ViewEmployeeModal = ({ onClose, item }) => {
    return (
        <Dialog
            onClose={onClose}
            open={true}
            fullWidth={true}
            maxWidth={"sm"}
        >
            <DialogContent>
                <Stack direction='column' spacing={3}>
                    <Typography sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>View Employee</Typography>
                    <Divider sx={{ mb: 3 }} />
                    <Stack direction='column' spacing={2}>
                        <InputWrapper>
                            <TextField
                                label="First Name"
                                value={item?.fName}
                                disabled
                            />
                        </InputWrapper>

                        <InputWrapper>
                            <TextField
                                label="Last Name"
                                value={item?.lName}
                                disabled
                            />
                        </InputWrapper>

                        <InputWrapper>
                            <TextField
                                label="Gender"
                                value={item?.gender}
                                disabled
                            >
                                <MenuItem key={"MALE"} value={"MALE"}>
                                    MALE
                                </MenuItem>
                                <MenuItem key={"FEMALE"} value={"FEMALE"}>
                                    FEMALE
                                </MenuItem>
                            </TextField>
                        </InputWrapper>

                        <InputWrapper>
                            <TextField
                                label="Age"
                                value={item?.age}
                                disabled
                            />
                        </InputWrapper>

                        <InputWrapper>
                            <TextField
                                label="Address"
                                value={item?.contactAdd}
                                disabled
                            />
                        </InputWrapper>

                        <InputWrapper>
                            <TextField
                                label="Email"
                                value={item?.email}
                                disabled
                            />
                        </InputWrapper>

                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default ViewEmployeeModal