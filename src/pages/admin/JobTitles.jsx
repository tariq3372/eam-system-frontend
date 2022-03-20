import { Button, Card, CardContent, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import AddJobTitlesModal from '../../components/JobTitles/AddJobTitlesModal';
import NoDataFound from '../../components/NoDataFound';

const JobTitles = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobTitles, setjobTitles] = useState();
  const [currSelectedItem, setCurrSelectedItem] = useState(null);

  const columns = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'jobTitleName', headerName: 'Job Title Name', flex: 1 },
  ]

  useEffect(() => {
  }, []);

  const handleRowClick = (e) => {
    setCurrSelectedItem(e.row);
  };

  const renderAddJobTitleModal = () => (showAddModal &&
    <AddJobTitlesModal
      onClose={() => setShowAddModal(false)}
    />
  )

  return (
    <>
      {renderAddJobTitleModal()}
      <Card>
        <CardContent>
          <Stack direction="row" spacing="auto">
            <Typography> Add New Job Title </Typography>
            <Button onClick={() => setShowAddModal(true)} variant="contained" >Add</Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card sx={{ mt: 2, display: 'flex', flexDirection: 'column', minHeight: 'auto' }}>
        <Grid sx={{ px: 3, pt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardHeader sx={{ p: 0 }} title="Job Title" />
        </Grid>
        <Divider sx={{ mt: 2 }} />
        <CardContent sx={{ display: 'flex', minHeight: 'auto', overflow: 'auto' }}>
          <DataGrid
            rows={jobTitles || []}
            columns={columns}
            loading={loading}
            onRowClick={handleRowClick}
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

export default JobTitles;