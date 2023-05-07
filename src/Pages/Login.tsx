import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Layout from "../Components/Layout";
import Typography from "@mui/material/Typography";

interface Credentials {
  nickname: string;
  code: string;
}

function Login() {
  const [credentials, setCredentials] = useState<Credentials>({
    nickname: "",
    code: "",
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth", credentials);
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="page-container">
      <Layout />
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
            {error && <div>{error}</div>}
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
