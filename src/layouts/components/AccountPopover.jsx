import { Person } from "@mui/icons-material";
import { IconButton, Box, Divider, Typography, Button } from "@mui/material";
import { alpha } from "@mui/material/styles";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuPopover from "./MenuPopover";

const AccountPopover = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  }

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        style={{
          padding: 0,
          width: 44,
          height: 44,
          ...{
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) =>
                alpha(
                  open
                    ? theme.palette.primary.light
                    : theme.palette.primary.lighter,
                  0.72
                ),
            },
          },
        }}
      >
        <Person />
      </IconButton>
      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap></Typography>
          <Typography sx={{ my: 0.1 }} variant="body2" noWrap></Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary" }}
            noWrap
          ></Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
};

export default AccountPopover;
