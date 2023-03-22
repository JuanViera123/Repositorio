import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";
import { login } from "../api";

const Login = () => {
  const [user, setuser] = useState("");
  const [password, setPassword] = useState("");

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  login(user, password);
};

const redirectToRegistro = () => {
  window.location.replace("/registro");
}

const hasLoginToken = localStorage.getItem("token");

  if(hasLoginToken){
    window.location.replace("/inicio");
  }

  return (
    <>
    <br></br>
    <br></br>
    <br></br>
     <form
      className="root"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          label="Usuario"
          type="user"
          autoComplete="false"
          value={user}
          onChange={(e: any) => setuser(e.target.value)} />
        <br />
        <br />
        <TextField
          label="Password"
          type="password"
          autoComplete="false"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)} />
      </div>
      <br />
      <Button variant="contained" color="primary" type="submit">
        Iniciar sesión
      </Button>
      <br />
      <br />
    <Button variant="contained" color="primary" onClick={redirectToRegistro}>
        Registrarse
      </Button>
    </form></>
  );
};

export default Login;