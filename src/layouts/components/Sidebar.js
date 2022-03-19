import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Box, Drawer, Typography } from '@mui/material';
import Scrollbar from './Scrollbar';
import NavSection from './NavSection';
import MHidden from './MHidden';
import sidebarConfig from '../SidebarConfig';
import palette from '../../theme/palette';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.neutral, 0.72),
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        backgroundColor: palette.dashboardBg,
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '24px', padding: '30px 10px', width: '100%' }}>
          <Box component={RouterLink} to="/" sx={{ display: 'inline-flex', marginRight: 'auto' }}>
            {/* <img src={Logo} style={{ width: '50px', height: '50px' }} /> */}
          </Box>
          EMA System
        </Typography>
      </Box>
      <NavSection onCloseSidebar={onCloseSidebar} navConfig={sidebarConfig} />
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
          anchor={'left'}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          anchor={'left'}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
