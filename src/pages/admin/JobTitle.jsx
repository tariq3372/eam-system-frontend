import { Button, Card, CardContent, CardHeader, Divider, Grid, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import AddEditJobTitlesModal from '../../components/JobTitles/AddEditJobTitlesModal';
import NoDataFound from '../../components/NoDataFound';
import ViewJobTitleModal from '../../components/JobTitles/ViewJobTitlesModal';
import { deleteJobTitleApi, getJobTitleApi } from '../../api';
import OverlayLoading from '../../components/OverlayLoading';
import { checkStatus } from '../../helpers';

const JobTitle = () => {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobTitles, setJobTitles] = useState();
  const [currSelectedItem, setCurrSelectedItem] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showOverlayLoading, setShowOverlayLoading] = useState(false);
  
  const columns = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'jobTitle', headerName: 'Job Title', flex: 1 },
    {
      field: 'button', headerName: "Actions", flex: 1, renderCell: (params) => {
        return (
          <Stack direction="row" spacing={2}>
            <Button variant="contained" onClick={() => handleRowAction("VIEW", params?.row)}>View</Button>
            <Button variant="contained" color="success" onClick={() => handleRowAction("EDIT", params?.row)}>Edit</Button>
            <Button variant="contained" color="error" onClick={() => handleRowAction("DELETE", params?.row)}>Delete</Button>
          </Stack>
        )
      }
    }
  ]

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    getJobTitleApi((res) => {
      setLoading(false);
      if(res.data) {
        let data = res.data.result?.map((item, index) => ({
          id: index,
          ...item
        }))
        setJobTitles(data);
      }
    })
  }

  const handleRowAction = (action, item) => {
    if(action === "VIEW") {
      setCurrSelectedItem(item);
      setShowViewModal(true);
    }
    else if(action === "EDIT") {
      setCurrSelectedItem(item);
      setShowAddEditModal(true);
    }
    else if(action === "DELETE") {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if(result.isConfirmed) {
          setShowOverlayLoading(true);
          deleteJobTitleApi(item._id, (res) => {
            setShowOverlayLoading(false);
            if(res.data) {
                Swal.fire(
                  'Deleted!',
                  'Job Title has been deleted',
                  'success'
                );
                fetchData();
            }
            else {
              checkStatus(res)
            }
          })
        }
      })
    }
  }

  const renderAddEditJobTitleModal = () => (showAddEditModal &&
    <AddEditJobTitlesModal
      onClose={() => {
        setShowAddEditModal(false);
        setCurrSelectedItem(null);
      }}
      item = {currSelectedItem}
      onRefreshData={()=> {
        fetchData();
        setShowAddEditModal(false);
        setCurrSelectedItem(null);
        Swal.fireI(
          "success",
          "Your request processed successfully",
          "success"
        )
      }}
    />
  )

  const renderViewJobTitleModal = () => ( showViewModal &&
    <ViewJobTitleModal
      onClose={()=> {
        setShowViewModal(false);
        setCurrSelectedItem(null);
      }}
      item={currSelectedItem}
    />
  )

  return (
    <>
      {renderAddEditJobTitleModal()}
      {renderViewJobTitleModal()}
      {showOverlayLoading && <OverlayLoading/>}
      <Card>
        <CardContent>
          <Stack direction="row" spacing="auto">
            <Typography> Add New Job Title </Typography>
            <Button onClick={() => setShowAddEditModal(true)} variant="contained" >Add</Button>
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

export default JobTitle;