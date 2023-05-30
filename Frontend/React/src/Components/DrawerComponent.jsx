import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StorageIcon from '@mui/icons-material/Storage';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MapIcon from '@mui/icons-material/Map';
import MemoryIcon from '@mui/icons-material/Memory';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import InventoryIcon from '@mui/icons-material/Inventory';
import SensorsIcon from '@mui/icons-material/Sensors';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function DrawerComponent(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const Content = props.content;
  const AvatarImage = props.avatarimage;
  const LogOut = props.logout;
  const Name = props.name;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            WATSON
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem key="Avatar" disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                <Avatar alt={Name} src={AvatarImage} />
                </ListItemIcon>
                <ListItemText primary={"Hi " + Name}  sx={{ opacity: open ? 1 : 0 }} primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem key="Leaflet" disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} to="/Map" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                  <MapIcon/>
                </ListItemIcon>
                <ListItemText primary="Leaflet"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem key="Chronograf" disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} to="/Chronograf" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                  <QueryStatsIcon/>
                </ListItemIcon>
                <ListItemText primary="Chronograf"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="InfluxDB" disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} to="/InfluxDB" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                  <StorageIcon/>
                </ListItemIcon>
                <ListItemText primary="InfluxDB"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="Kapacitor" disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} to="/Kapacitor" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                  <MemoryIcon/>
                </ListItemIcon>
                <ListItemText primary="Kapacitor"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="Telegraf" disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} to="/Telegraf" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                  <SettingsInputAntennaIcon/>
                </ListItemIcon>
                <ListItemText primary="Telegraf"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem key="Mosquito" disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} to="/Mosquito" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                  <InventoryIcon/>
                </ListItemIcon>
                <ListItemText primary="Mosquito"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem key="Sensors" disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} to="/Sensors" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                  <SensorsIcon/>
                </ListItemIcon>
                <ListItemText primary="Sensors"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="Consumers" disablePadding sx={{ display: 'block' }}>
              <ListItemButton component={Link} to="/Consumers" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                  <ReadMoreIcon/>
                </ListItemIcon>
                <ListItemText primary="Consumers"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <Divider/>
            <ListItem key="Nginx" disablePadding sx={{ display: 'block' }} style={{ flexGrow: 1 }}>
              <ListItemButton component={Link} to="/Nginx" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                  <ForkRightIcon/>
                </ListItemIcon>
                <ListItemText primary="Nginx"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem key="LogOut" disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={LogOut} component={Link} to="/" sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5}}>
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center'}}>
                  <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary="LogOut"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Content/>
      </Box>
    </Box>
  );
}