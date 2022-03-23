import { Card, CardContent, CardHeader, Divider, Grid, Box, Stack, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import NoDataFound from '../../components/NoDataFound';
import AddEditEmployeeModal from '../../components/Employees/AddEditEmployeeModal';
import { deleteEmployeeApi, getEmployeeApi } from '../../api';
import ViewEmployeeModal from '../../components/Employees/ViewEmployeeModal';
import Swal from 'sweetalert2';
import OverlayLoading from '../../components/OverlayLoading';
import { checkStatus } from '../../helpers';

const Employee = () => {
  const [currSelectedItem, setCurrSelectedItem] = useState(null);
  const [employees, setEmployees] = useState();
  const [loading, setLoading] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showOverlayLoading, setShowOverlayLoading] = useState(false);

  const columns = [
    { field: '_id', headerName: "ID", width: 250 },
    { field: 'fName', headerName: "First Name", width: 150 },
    { field: 'lName', headerName: "Last Name", width: 150 },
    { field: 'gender', headerName: "Gender", width: 100 },
    { field: 'age', headerName: "Age", width: 100 },
    { field: 'contactAdd', headerName: "Contact Add", width: 200 },
    { field: 'email', headerName: "Email", width: 200 },
    {
      field: 'button', headerName: "Actions", width: 250, renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => handleRowAction("VIEW", params?.row)}>View</Button>
            <Button variant="contained" color="success" onClick={() => handleRowAction("EDIT", params?.row)}>Edit</Button>
            <Button variant="contained" color="error" onClick={() => handleRowAction("DELETE", params?.row)}>Delete</Button>
          </Stack>
        )
      }
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
      setLoading(true);
      getEmployeeApi({ page: 1, limit: 100 }, (res) => {
      setLoading(false);
      if (res.data) {
        let data = res.data.result?.map((item, index) => ({
          id: index,
          ...item,
        }));
        setEmployees(data);
      };
    })
  };

  const handleRowAction = (action, item) => {
    if (action === "VIEW") {
      setCurrSelectedItem(item);
      setShowViewModal(true);
    } else if (action === "EDIT") {
      setCurrSelectedItem(item);
      setShowAddEditModal(true);
    } else if (action === "DELETE") {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          setShowOverlayLoading(true);
          deleteEmployeeApi(item._id, (res) => {
            setShowOverlayLoading(false);
            if (res.data) {
              Swal.fire(
                'Deleted!',
                'Employee has been deleted.',
                'success'
              );
              fetchData();
            } else {
              checkStatus(res);
            }
          })
        }
      })
    };
  };

  const renderAddEditEmployeeModal = () => (showAddEditModal &&
    <AddEditEmployeeModal
      onClose={() => {
        setShowAddEditModal(false);
        setCurrSelectedItem(null);
      }}
      item={currSelectedItem}
      onRefreshData={() => {
        fetchData();
        setShowAddEditModal(false);
        setCurrSelectedItem(null);
        Swal.fire(
          "Success",
          "Your request processed successfully.",
          "success"
        );
      }}
    />
  )
  const renderViewEmployeeModal = () => (showViewModal &&
    <ViewEmployeeModal
      onClose={() => {
        setShowViewModal(false);
        setCurrSelectedItem(null);
      }}
      item={currSelectedItem}
    />
  )

  return (
    <>
      {renderAddEditEmployeeModal()}
      {renderViewEmployeeModal()}
      {showOverlayLoading && <OverlayLoading />}
      <Card>
        <CardContent>
          <Stack direction="row" spacing="auto">
            <Typography>Add New Employee</Typography>
            <Button onClick={() => setShowAddEditModal(true)} variant="contained">Add</Button>
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

export default Employee;