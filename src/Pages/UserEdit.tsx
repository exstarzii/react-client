import { useRef, useState } from "react";
import Layout from "../Components/Layout";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import api from "../api";
import { useNavigate } from "react-router-dom";
import NotificationBar from "../Components/NotificationBar";

function UserEdit() {
  const [credentials, setCredentials] = api.useGetUser();
  const navigate = useNavigate();
  const notifyRef = useRef(null);

  const handleChange = (event: any) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    api
      .useUpdateUser(credentials)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          navigate("/user");
        }
      })
      .catch((error) => {
        const mes = error.response.data.message.join(', ')
        console.log(mes)
        const ref:any =notifyRef.current
        ref.showMesssage(mes|| error.message,"error")
      });
  };

  const handleFileUpload = (event: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      const val = reader.result as string;
      setCredentials({ ...credentials, photo: val });
    };
  };

  return (
    <div className="page-container">
      <Layout />
      <NotificationBar ref={notifyRef} />
      <div className="page-content">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" align="center">
              Edit User Info
            </Typography>
            <label>
              <Avatar
                alt="avatar"
                src={
                  credentials.photo == ""
                    ? "placeholder.png"
                    : credentials.photo
                }
                className="avatar cursor-pointer"
              />
              <input
                id="fileInput"
                style={{ display: "none" }}
                type="file"
                onChange={handleFileUpload}
              />
            </label>
            <TextField
              label="Nickname"
              name="nickname"
              value={credentials.nickname||''}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Phone"
              name="phone"
              type="phone"
              value={credentials.phone||''}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="name"
              name="name"
              type="text"
              value={credentials.name||''}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="surename"
              name="surename"
              type="text"
              value={credentials.surename||''}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="email"
              name="email"
              type="email"
              value={credentials.email||''}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <TextField
              label="age"
              name="age"
              type="number"
              value={credentials.age||''}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="male"
              name="sex"
              value={credentials.sex || "male"}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
            <TextField
              label="city"
              name="city"
              type="text"
              value={credentials.city||''}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            {/* nickname: "",
                phone: "",
                photo: "",
                name: "",
                surename: "",
                email: "",
                age: "",
                sex: "",
                city: "",
                about: "", */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Save
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default UserEdit;
