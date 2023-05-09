import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import api from "../api";
import jwt_decode from "jwt-decode";
import NotificationBar from "../Components/NotificationBar";
import { useRef } from "react";
import Posts from "../Components/Posts";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const rows = [
  {
    col1: "Name",
    col2: "",
  },
  {
    col1: "Surename",
    col2: "",
  },
  {
    col1: "Email",
    col2: "",
  },
  {
    col1: "Age",
    col2: "",
  },
  {
    col1: "Nickname",
    col2: "",
  },
  {
    col1: "Phone",
    col2: "",
  },
  {
    col1: "Sex",
    col2: "",
  },
  {
    col1: "City",
    col2: "",
  },
  {
    col1: "About",
    col2: "",
  },
];

function User() {
  let { id } = useParams();
  const [credentials, setCredentials] = api.useGetUserById(id || "");
  const payload: any = jwt_decode(localStorage.token);
  const notifyRef = useRef(null);
  const navigate = useNavigate();
  // console.log(id,payload)

  rows[0].col2 = credentials.name || "";
  rows[1].col2 = credentials.surename || "";
  rows[2].col2 = credentials.email || "";
  rows[3].col2 = credentials.age || "";
  rows[4].col2 = credentials.nickname || "";
  rows[5].col2 = credentials.phone || "";
  rows[6].col2 = credentials.sex || "";
  rows[7].col2 = credentials.city || "";
  rows[8].col2 = credentials.about || "";

  const AddFriendHandle = () => {
    api.useAddFriend(id || "").then((response: any) => {
      console.log(response);
      const ref: any = notifyRef.current;
      ref.showMesssage("Congratulations! Now you have a new friend", "success");
      setCredentials(response.data);
    });
  };
  const DelFriendHandle = () => {
    api.useDelFriend(id || "").then((response: any) => {
      console.log(response);
      const ref: any = notifyRef.current;
      ref.showMesssage("Deleted", "success");
      setCredentials(response.data);
    });
  };

  return (
    <div className="page-container">
      <Layout />
      <NotificationBar ref={notifyRef} />
      <div className="page-content">
        <div className="form-container">
          <Card sx={{ display: "flex" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <TableContainer>
                <Avatar
                  alt="avatar"
                  src={
                    credentials.photo == ""
                      ? "placeholder.png"
                      : credentials.photo
                  }
                  className="avatar"
                />
                <Table aria-label="simple table">
                  <TableBody>
                    {rows
                      .filter((row) => {
                        return row.col2 > "";
                      })
                      .map((row, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.col1}
                          </TableCell>
                          <TableCell align="right">{row.col2}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                {!id || id == payload.sub ? (
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => navigate("/useredit")}
                  >
                    Edit
                  </Button>
                ) : credentials.friends &&
                  credentials.friends.includes(payload.sub) ? (
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    fullWidth
                    onClick={DelFriendHandle}
                  >
                    Delete from friends
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={AddFriendHandle}
                  >
                    Add to friends
                  </Button>
                )}
              </TableContainer>
            </CardContent>
          </Card>
          <Posts
            edit={!id || id == payload.sub}
            id={id || payload.sub}
            user={credentials}
          />
        </div>
      </div>
    </div>
  );
}
export default User;
