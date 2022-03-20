import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getDashboardCountApi } from "../../api";

const Dashboards = () => {
  const [employees, setEmployees] = useState(0);
  const [departments, setDepartments] = useState(0);
  const [jobTitles, setJobTitles] = useState(0)

  useEffect(() => {
    getDashboardCountApi((res) => {
      if(res.data) {
        console.log("getDashboardCountApi response", res.data);
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
  
  return (
    <Container style={{ minHeight: "100%", display: "flex" }}>
      <Stack flex={1} direction="column" spacing={3}>
        <Card style={{ backgroundColor: "lightgreen" }}>
          <CardContent>
            Employees
            <Typography>{employees}</Typography>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: "lightblue" }}>
          <CardContent>
            Departments
            <Typography>{departments}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ backgroundColor: "lightsalmon" }}>
            Job Titles
            <Typography>{jobTitles}</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default Dashboards;
