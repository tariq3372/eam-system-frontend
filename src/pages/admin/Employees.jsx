import React, { useEffect, useState } from "react";
import AddEmployeeModal from "../../components/Employees/AddEmployeeModal";
import { Card, CardContent, CardHeader, Divider, Grid, Box, Stack, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import NoDataFound from '../../components/NoDataFound';


const Employees = () => {
  const [currSelectedItem, setCurrSelectedItem] = useState(null);
  const [employees, setEmployees] = useState();
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const columns = [
    { field: '_id', headerName: "ID", flex: 1 },
    { field: 'fname', headerName: "First Name", flex: 1 },
    { field: 'lName', headerName: "Last Name", flex: 1 },
    { field: 'age', headerName: "Age", flex: 1 },
    { field: 'gender', headerName: "Gender", flex: 1 },
    { field: 'contact_add', headerName: "Contact Add", flex: 1 },
    { field: 'emp_email', headerName: "Email", flex: 1 },

  ];

  useEffect(() => {
  }, []);

  const handleRowClick = (e) => {
    setCurrSelectedItem(e.row);
  };

  const renderAddEmployeeModal = () => ( showAddModal && 
    <AddEmployeeModal
      onClose={() => setShowAddModal(false)}
    />
  );

  return (
    <>
      {renderAddEmployeeModal()}
      <Card>
        <CardContent>
          <Stack direction="row" spacing="auto">
            <Typography>Add New Employee</Typography>
            <Button onClick={() => setShowAddModal(true)} variant="contained">Add</Button>
          </Stack>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card sx={{ mt: 2, display: 'flex', flexDirection: 'column', minHeight: 'auto' }}>
        <Grid sx={{ px: 3, pt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <CardHeader sx={{ p: 0 }} title="Employees" />
        </Grid>
        <Divider sx={{ mt: 2 }} />
        <CardContent sx={{ display: 'flex', minHeight: 'auto', overflow: 'auto' }}>
          <DataGrid
            rows={employees || []}
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
  );
};

export default Employees;
