import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import React, { useState } from 'react'
import AddDepartmentModal from '../../components/Departments/AddDepartmentModal';


const Departments = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const renderAddDepartmentModal = () => ( showAddModal && 
    <AddDepartmentModal
    onClose={setShowAddModal(false)}
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

    </>
  )
}

export default Departments