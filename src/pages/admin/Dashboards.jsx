import { Card, CardContent, Container, Stack, Typography } from "@mui/material";
import React from "react";

const Dashboards = () => {
  return (
    <Container style={{ minHeight: "100%", display: "flex" }}>
      <Stack flex={1} direction="column" spacing={3}>
        <Card style={{ backgroundColor: "lightgreen" }}>
          <CardContent>
            Employees
            <Typography>10</Typography>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: "lightblue" }}>
          <CardContent>
            Departments
            <Typography>10</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent style={{ backgroundColor: "lightsalmon" }}>
            Job Titles
            <Typography>10</Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default Dashboards;
