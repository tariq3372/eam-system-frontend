import { Button, Card, CardContent, CircularProgress, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { checkInApi, checkIsCheckInApi, checkoutApi, leaveApi, leaveRequestApi } from "../../api";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckIn, setIsCheckIn] = useState(false);
  const [isLeave, setIsLeave] = useState(false);
  const id = localStorage.getItem('_id');

  useEffect(() => {
    setLoading(true)
    handleCheckInStatue();
  }, [id])

  const handleCheckInStatue = () => {
    checkIsCheckInApi({ id }, (res) => {
      setLoading(false);
      if (res.data) {
        if (res.data.isLeaveRequestExist) {
          setIsLeave(true);
        } else {
          setIsLeave(false)
        }
        if (res.data.isDurationExist) {
          setIsCheckIn(false);
        } else {
          setIsCheckIn(true);
        }
      };
    })
  }

  const handleCheckIn = () => {
    setIsLoading(true);
    checkInApi({ id }, (res) => {
      setIsLoading(false);
      if (res.data) {
        Swal.fire(
          'Success',
          "Your request processed successfully",
          "success"
        );
        handleCheckInStatue();
      } else {
        Swal.fire(
          'Error',
          "Something went wrong, Please try again later",
          "error"
        );
      }
    })
  }

  const handleCheckOut = () => {
    setIsLoading(true);
    checkoutApi(id, (res) => {
      setIsLoading(false);
      if (res.data) {
        Swal.fire(
          'Success',
          "Your request processed successfully",
          "success"
        );
        handleCheckInStatue();
      } else {
        Swal.fire(
          'Error',
          "Something went wrong, Please try again later",
          "error"
        );
      }
    })
  }

  const handleLeave = () => {
    setIsLoading(true);
    leaveRequestApi(id, (res) => {
      setIsLoading(false);
      if (res.data) {
        Swal.fire(
          'Success',
          'Your request is send to admin',
          'success'
        )
        handleCheckInStatue();
      } else {
        Swal.fire(
          'Error',
          'Something went wrong, Please try again later',
          'error'
        )
      }
    })
  }

  if (loading || isLoading) return (
    <Container style={{ minHeight: "100%", display: "flex", alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress color="inherit" />
    </Container>
  )
  const renderLeaveRequest = () => {
    if (!isLeave) {
      return (<Card style={{ backgroundColor: "lightsalmon" }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>{"Want leave"}</Typography>
          <Button variant="contained" size="large" onClick={() => handleLeave()} >Leave Request</Button>
        </CardContent>
      </Card>)
    }
  }
  return (
    <Container style={{ minHeight: "100%", display: "flex" }}>
      <Stack flex={1} direction="column" spacing={5}>
        <>
          {!isCheckIn ?
            <Card style={{ backgroundColor: "lightgreen" }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>{"Want to check in"}</Typography>
                <Button variant="contained" size="large" onClick={() => handleCheckIn()} >Check In</Button>
              </CardContent>
            </Card>
            :
            <Card style={{ backgroundColor: "lightblue" }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>{"Want to check out"}</Typography>
                <Button variant="contained" size="large" onClick={() => handleCheckOut()} >Checkout</Button>
              </CardContent>
            </Card>
          }
          {renderLeaveRequest()}
        </>
      </Stack>
    </Container>
  );
};

export default Dashboard;