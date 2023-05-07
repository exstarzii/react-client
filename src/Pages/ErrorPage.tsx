import React from "react";
import Layout from "../Components/Layout";
import Typography from "@mui/material/Typography";

function ErrorPage() {
  return (
    <div className="page-container">
      <Layout />
      <div className="page-content">
        <div className="form-container">
          <Typography variant="h4" align="center">
            Page not found
          </Typography>
        </div>
      </div>
    </div>
  );
}
export default ErrorPage;
