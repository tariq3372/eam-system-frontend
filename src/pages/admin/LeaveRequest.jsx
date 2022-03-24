import { Button, Card, CardContent, CardHeader, Divider, Grid, Stack } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { getLeaveRequestApi, updateLeaveRequestApi } from '../../api'
import NoDataFound from '../../components/NoDataFound'

const LeaveRequest = () => {
    const [loading, setLoading] = useState(false);
    const [leaveRequest, setLeaveRequest] = useState();

    const columns = [
        { field: 'employeeId', headerName: 'Emp Id', flex: 1 },
        { field: 'fName', headerName: 'First Name', flex: 1 },
        { field: 'lName', headerName: 'Last Name', flex: 1 },
        { field: 'button', headerName: 'Actions', flex: 1, renderCell: (params) => {
            return (
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="success" onClick={() => handleRowAction("APPROVED", params?.row)} > APPROVE </Button>
                    <Button variant="contained" color="error" onClick={() => handleRowAction("REJECTED", params?.row)} > REJECT </Button>
                </Stack>
            )
        }}
    ]
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        getLeaveRequestApi((res) => {
            setLoading(false);
            if(res.data) {
                let data = res.data.result?.map((item, index) => ({
                    id: index,
                    ...item
                }));
                setLeaveRequest(data);
            }
        })
    }

    const updateLeaveRequest = (data) => {
        updateLeaveRequestApi(data._id, data.status, (res) => {
            if(res.data) {
                setLoading(false);
                Swal.fire(
                    'Success',
                    'Leave request is approved',
                    'success'
                )
                fetchData();
            }
            else {
                Swal.fire(
                    'Error',
                    'Something went wrong, Please try again later',
                    'error'
                )
            }
        })
    }

    const handleRowAction = (action, item) => {
        setLoading(true);
        if(action === "APPROVED") {
            const data = {
                _id: item._id,
                status: "APPROVED"
            }
            updateLeaveRequest(data)
        }
        else if(action === "REJECTED") {
            const data = {
                _id: item._id,
                status: "REJECTED"
            }
            updateLeaveRequest(data)
        }
    }
    
  return (
    <>
        <Card sx={{ marginTop: 2, display: 'flex', flexDirection: 'column', minHeight: 'auto' }}>
            <Grid sx={{ px: 3, pt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <CardHeader sx={{ p: 0 }} title="Leave Requests"/>
            </Grid>
            <Divider sx={{ mt: 2 }}/>
            <CardContent sx={{ display: 'flex', minHeight: 'auto', overflow: 'auto' }} >
                <DataGrid
                    rows={leaveRequest || []}
                    columns={columns}
                    loading={loading}
                    components={{
                        NoRowsOverlay: NoDataFound,
                    }}
                    sx={{ '& .MuiDataGrid-row:hover': { cursor: 'pointer' }, minWidth: 800, minHeight: 350, p: 0, m: 0 }}
                />
            </CardContent>
        </Card>
    </>
  )
}

export default LeaveRequest