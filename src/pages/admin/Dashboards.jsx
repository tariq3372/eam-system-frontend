import { Card, CardContent, CircularProgress, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDashboardCountApi } from "../../api";

const Dashboards = () => {
  const [employees, setEmployees] = useState(0);
  const [departments, setDepartments] = useState(0);
  const [jobTitles, setJobTitles] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardCountApi((res) => {
      if(res.data) {
        setLoading(false);
        const { departments, jobTitles, employees } = res.data
        setDepartments(departments);
        setJobTitles(jobTitles);
        setEmployees(employees);
      }
      else {
        console.log("getDashboardCountApi error")
      }
    })
  }, [])

  const renderCount = (count) => (
    loading? <CircularProgress size={20} sx ={{ mt: 2 }} /> : count
  )
  
  return (
    <Container style={{ minHeight: "100%", display: "flex" }}>
      <Stack flex={1} direction="column" spacing={3}>
        <Card style={{ backgroundColor: "lightgreen" }}>
          <CardContent>
            Employees
            <Typography>{renderCount(employees)}</Typography>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: "lightblue" }}>
          <CardContent>
            Departments
            <Typography>{renderCount(departments)}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ backgroundColor: "lightsalmon" }}>
            Job Titles
            <Typography>{renderCount(jobTitles)}</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default Dashboards;
