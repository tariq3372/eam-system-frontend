import React from "react";
import {
  Container,
  Card,
  CardContent,
  Stack,
  Avatar,
  Input,
  FormControl,
  InputAdornment,
  Button,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { AccountCircle } from "@mui/icons-material";
// import FormControl from "@mui/material/FormControl";

const Login = () => {
  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ p: 2, minWidth: 300 }}>
        <CardContent>
          <Stack direction="column" spacing={6}>
            <Avatar
              sx={{ bgColor: "lightgreen", alignSelf: "center" }}
              variant="rounded"
            >
              <AssignmentIcon />
            </Avatar>
            <Stack direction="column" spacing={4}>
              <FormControl variant="standard">
                <Input
                  placeholder="Email"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="standard">
                <Input
                  placeholder="Password"
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Stack>
            <Button loading loadingPosition="start" variant="contained">
              Save
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
