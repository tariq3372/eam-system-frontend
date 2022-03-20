import { Button, Card, CardContent, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import { useEffect } from 'react';
import AddDepartmentModal from '../../components/Departments/AddDepartmentModal';
import NoDataFound from '../../components/NoDataFound';


const Departments = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [currSelectedItem, setCurrSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState();

  const columns = [
    { field: '_id', headerName: "ID", flex: 1 },
    { field: 'departmentName', headerName: "Department Name", flex: 1 },
  ];

  useEffect(() => {
  }, []);
  
  const handleRowClick = (e) => {
    setCurrSelectedItem(e.row);
  };

  const renderAddDepartmentModal = () => ( showAddModal && 
    <AddDepartmentModal
    onClose={() => setShowAddModal(false)}
    />
  );
  return (
    <>
    {renderAddDepartmentModal()}
    <Card>
      <CardContent>
        <Stack direction="row" spacing="auto">
          <Typography> Add New Department </Typography>
          <Button onClick={() => setShowAddModal(true)} variant="contained" >Add</Button>
        </Stack>
      </CardContent>
    </Card>

      {/* Data Table */}
      <Card sx={{ mt: 2, display: 'flex', flexDirection: 'column', minHeight: 'auto' }}>
        <Grid sx={{ px: 3, pt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardHeader sx={{ p: 0 }} title="Department" />
        </Grid>
        <Divider sx={{ mt: 2 }} />
        <CardContent sx={{ display: 'flex', minHeight: 'auto', overflow: 'auto' }}>
          <DataGrid
            rows={departments || []}
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

export default Departments