import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Layout from "../Components/Layout";
import Typography from "@mui/material/Typography";
import React from "react";
import NotificationBar from "../Components/NotificationBar";

interface Credentials {
  nickname: string;
  code: string;
}

function Login() {
  const API_URL = process.env.REACT_APP_API;
  const [credentials, setCredentials] = useState<Credentials>({
    nickname: "",
    code: "",
  });
  const navigate = useNavigate();
  const notifyRef = useRef(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/login`, credentials);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      navigate("/user");
    } catch (error: any) {
      const mes = error.response.data.message.join(", ");
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
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" align="center">
              Login
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
              label="Code"
              name="code"
              type="password"
              value={credentials.code}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
