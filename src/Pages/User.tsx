import { useParams } from "react-router-dom";
import Layout from "../Components/Layout";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import api from "../api";

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

function EditInfoButton({ id }: any) {
  const navigate = useNavigate();
  return !id ? (
    <Button
      type="button"
      variant="contained"
      color="primary"
      fullWidth
      onClick={() => navigate("/useredit")}
    >
      Edit
    </Button>
  ) : null;
}

function User() {
  let { id } = useParams();
  const [credentials, setCredentials] =  api.useGetUser();
  rows[0].col2 = credentials.name || ''
  rows[1].col2 = credentials.surename|| ''
  rows[2].col2 = credentials.email|| ''
  rows[3].col2 = credentials.age|| ''
  rows[4].col2 = credentials.phone|| ''
  rows[5].col2 = credentials.sex|| ''
  rows[6].col2 = credentials.city|| ''
  rows[7].col2 = credentials.about|| ''
  return (
    <div className="page-container">
      <Layout />
      <div className="page-content">
        <div className="form-container">
          <TableContainer component={Paper}>
            <Typography variant="h4" align="center">
              User info
            </Typography>
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
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.col1}
                      </TableCell>
                      <TableCell align="right">{row.col2}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <EditInfoButton id={id} />
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
export default User;
