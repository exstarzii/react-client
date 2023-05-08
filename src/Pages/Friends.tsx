import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Paper from "@mui/material/Paper";
import api, { Credentials } from "../api";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Friends() {
  const navigate = useNavigate();
  const getListItems =(source:[Credentials],nicknamePrefix:string):JSX.Element[]=>{
    if(source.length <1){
      return [<Typography variant="h6" align="center" key={0}>
      While you have no friends
    </Typography>]
    }
    return source
    .filter((item) => item.nickname && item.nickname?.indexOf(nicknamePrefix) > -1)
    .map((user, i) => (
      <ListItem disablePadding key={i}>
        <ListItemButton
          onClick={() => {
            navigate("/user/" + user._id);
          }}
        >
          <ListItemAvatar>
            <Avatar alt="avatar" src={user.photo} />
          </ListItemAvatar>
          <ListItemText
            primary={user.nickname}
            secondary={(user.surename||'')+ " " + (user.name||'')}
          />
        </ListItemButton>
      </ListItem>
    ))
  }
  const [users, setUsers] = api.useGetFriends();
  const [search, setSearch] = useState("");
  const [usersList, setUsersList] = useState(
    getListItems(users,'')
  );
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setUsersList(getListItems(users,event.target.value))
  };
  useEffect(() => {
    setUsersList(getListItems(users,''))
    console.log('useEffect users')
  }, [users]);

  return (
    <div className="page-container">
      <Layout />
      <div className="page-content">
        <div className="form-container">
          <Paper elevation={2}>
            <Typography variant="h5" align="center" paragraph>
              My friends
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={search}
                onChange={handleSearch}
              />
            </Search>
            <Divider />
            <List>{usersList}</List>
          </Paper>
        </div>
      </div>
    </div>
  );
}
export default Friends;
