import { Dialog, DialogContent, Divider, MenuItem, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import InputWrapper from '../InputWrapper'

const ViewDepartmentModal = ({ onClose, item }) => {
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
                                label="Department Name"
                                value={item?.departmentName}
                                disabled
                            />
                        </InputWrapper>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default ViewDepartmentModal