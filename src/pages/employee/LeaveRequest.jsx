import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { getEmployeeLeaveRequestApi } from '../../api'
import NoDataFound from '../../components/NoDataFound'

const LeaveRequest = () => {
    const [loading, setLoading] = useState(false);
    const [leaveRequest, setLeaveRequest] = useState();

    const columns = [
        { field: 'id', headerName: '#NO', flex: 1 },
        { field: 'createdAt', headerName: 'Date', flex: 1 },
        { field: 'status', headerName: 'Status', flex: 1 }
    ];

    const _id = localStorage.getItem('_id');

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = () => {
        setLoading(true);
        getEmployeeLeaveRequestApi(_id, (res) => {
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

  return (
    <>
      {/* Data Table */}
      <Card style={{ marginTop: 2, display: 'flex', flexDirection: 'column', minHeight: 'auto'}}>
        <Grid sx={{ px: 3, pt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
          <CardHeader sx={{ padding: 0 }} title="Reports"/>
        </Grid>
        <Divider sx={{ mt: 2 }}/>
        <CardContent style={{ display: 'flex', minHeight: 'auto', overflow: 'auto'}}>
          <DataGrid
            rows={leaveRequest || []}
            columns={columns}
            loading={loading}
            component={{
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