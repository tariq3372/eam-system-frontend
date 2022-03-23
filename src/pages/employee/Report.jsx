import { Card, CardContent, CircularProgress, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getEmployeeAttendanceReportsApi } from "../../api";

const Report = () => {
  const [totalWorkingMinutes, settotalWorkingMinutes] = useState(0);
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [loading, setLoading] = useState(true);
  const _id = localStorage.getItem('_id');

  useEffect(() => {
    getEmployeeAttendanceReportsApi({ _id }, (res) => {
        if(res.data) {
            setLoading(false);
            const { totalWorkingMinutes, totalLeaves, totalSalary } = res.data
            settotalWorkingMinutes(totalWorkingMinutes);
            setTotalLeaves(totalLeaves);
            setTotalSalary(totalSalary);
        }
    })
  }, [])

  const renderCount = (count) => (
    loading ? <CircularProgress size={20} sx={{ mt: 2 }} /> : count
  )

  return (
    <Container style={{ minHeight: "100%", display: "flex" }}>
      <Stack flex={1} direction="column" spacing={3}>

        <Card style={{ backgroundColor: "lightgreen" }}>
          <CardContent>
            Total Working Minutes
            <Typography>{renderCount(totalWorkingMinutes)}</Typography>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: "lightblue" }}>
          <CardContent>
            Total Leaves
            <Typography>{renderCount(totalLeaves)}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ backgroundColor: "lightsalmon" }}>
            Total Salary
            <Typography>{renderCount(totalSalary)}</Typography>
          </CardContent>
        </Card>

      </Stack>
    </Container>
  );
};

export default Report;
