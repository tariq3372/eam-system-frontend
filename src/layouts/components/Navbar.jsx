import React from "react";
import { MenuOpen } from "@mui/icons-material";
import { AppBar, Box, IconButton, Stack, styled, Toolbar } from "@mui/material";
import palette from '../../theme/palette';
import AccountPopover from "./AccountPopover";
import MHidden from "./MHidden";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: palette.dashboardBg,
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APP_BAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APP_BAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const Navbar = ({ onOpenSidebar }) => {
  return (
    <RootStyle>
      <ToolbarStyle>
        <MHidden width="lgUp">
          <IconButton
            onClick={onOpenSidebar}
            style={{ mr: 1, color: "text.primary" }}
          >
            <MenuOpen />
          </IconButton>
        </MHidden>
        <Box style={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default Navbar;
