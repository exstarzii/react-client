import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PeopleIcon from '@mui/icons-material/People';

const Layout = () => {
  const [state, setState] = React.useState(false);
  const navigate = useNavigate();
  const essentialLinks = [
    {
      title: "Login",
      icon: <LoginIcon/>,
      link: "/login",
    },
    {
      title: "Signup",
      icon: <LoginIcon/>,
      link: "/signup",
    },
  ];
  const listItems = essentialLinks.map((link,i) => (
    <ListItem disablePadding key={i}>
      <ListItemButton onClick={() => navigate(link.link)}>
        <ListItemIcon>
          {link.icon}
        </ListItemIcon>
        <ListItemText primary={link.title} />
      </ListItemButton>
    </ListItem>
  ));
  const authlinksList = [
    {
      title: "Account",
      icon: <PersonIcon/>,
      link: "/user",
    },
    {
      title: "Posts",
      icon: <NewspaperIcon/>,
      link: "/posts",
    },
    {
      title: "Friends",
      icon: <PeopleIcon/>,
      link: "/friends",
    },
    {
      title: "People",
      icon: <PeopleIcon/>,
      link: "/people",
    },
    {
      title: "Log out",
      icon: <LogoutIcon/>,
      link: "/login",
      onClick: () => {
        localStorage.token = ''
      },
    },
  ];
  const authListItems = authlinksList.map((link,i) => (
    <ListItem disablePadding key={i}>
      <ListItemButton onClick={() => {navigate(link.link);if(link.onClick)link.onClick()}}>
        <ListItemIcon>
          {link.icon}
        </ListItemIcon>
        <ListItemText primary={link.title} />
      </ListItemButton>
    </ListItem>
  ));
  const token = localStorage.token;

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setState(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Navigation
        </Typography>
      </Toolbar>
      <Drawer anchor="left" open={state} onClose={() => setState(false)}>
        <nav aria-label="main mailbox folders" className="drawer-content">
          <List>
            {token?authListItems:listItems}
          </List>
        </nav>
      </Drawer>
    </AppBar>
  );
};
export default Layout;
