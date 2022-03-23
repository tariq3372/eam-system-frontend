import React, { useEffect, useState } from 'react'
import { Card, CardHeader, Grid, CardContent, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import NoDataFound from '../../components/NoDataFound';
import { getAttendanceReportApi } from '../../api';

const Report = () => {
  const [reports, setReports] = useState();
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: '_id', headerName: "Emp Id", flex: 1 },
    { field: 'fName', headerName: "First Name", flex: 1 },
    { field: 'lName', headerName: "Last Name", flex: 1 },
    { field: 'workTimeInMins', headerName: "Working Time In Mins", flex: 1 },
    { field: 'totalLabor', headerName: 'Total Labor', flex: 1 },
    { field: 'salary', headerName: 'Salary', flex: 1 }
  ]

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    setLoading(true)
    getAttendanceReportApi((res) => {
      setLoading(false)
      if(res.data) {
        let data = res.data.result?.map((item, index) => ({
          id: index,
          ...item
        }));
        setReports(data);
      }
    })
  }

  return (
    <>
      <Card style={{ marginTop: 2, display: 'flex', flexDirection: 'column', minHeight: 'auto'}}>
        <Grid sx={{ px: 3, pt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
          <CardHeader sx={{ padding: 0 }} title="Reports"/>
        </Grid>
        <Divider sx={{ mt: 2 }}/>
        <CardContent style={{ display: 'flex', minHeight: 'auto', overflow: 'auto'}}>
          <DataGrid
            rows={reports || []}
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

export default Report