import React from 'react'
import { Backdrop, CircularProgress } from "@mui/material";

const OverlayLoading = () => {
  return (
      <Backdrop
        style={{ color: '#fff', zIndex:(theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  )
}

export default OverlayLoading