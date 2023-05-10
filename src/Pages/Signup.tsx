import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Layout from "../Components/Layout";
import NotificationBar from "../Components/NotificationBar";

interface Credentials {
  nickname: string;
  phone: string;
}
function Signup() {
  const API_URL = process.env.REACT_APP_API;
  const [credentials, setCredentials] = useState<Credentials>({
    nickname: "",
    phone: "",
  });
  const notifyRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //fix phone number with 8... instead of +7...
      if (credentials.phone[0] == "8") {
        credentials.phone = "+7" + credentials.phone.substring(1);
      }
      const response = await axios.post(`${API_URL}/user`, credentials);
      // console.log("Account created")
      const ref: any = notifyRef.current;
      ref.showMesssage("Account created", "success");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      const mes = Array.isArray(error.response.data.message)
        ? error.response.data.message.join(", ")
        : error.response.data.message;
      console.log(mes);
      const ref: any = notifyRef.current;
      ref.showMesssage(mes || error.message, "error");
    }
  };

  return (
    <div className="page-container">
      <Layout />
      <NotificationBar ref={notifyRef} />
      <div className="page-content">
        <div className="form-container form-login">
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" align="center">
              Sign Up
            </Typography>
            <TextField
              label="Nickname"
              name="nickname"
              value={credentials.nickname}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              label="Phone"
              name="phone"
              type="phone"
              value={credentials.phone}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign up
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Signup;
