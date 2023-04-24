import React, { Component } from "react";
import { Paper, Button, ButtonGroup , TextField, Typography} from "@mui/material";

import {
  withStyles
} from '@mui/styles';

import bg from "../img/login-background.jpg";

class LoginComponent extends Component {
  render() {
    function LoginCallback(params) {
      window.location = "/map";
    }

    const backgroundStyles = {
      backgroundImage: `url(${bg})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      flexDirection: "column",
    };

    const spacing = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    };

    const glass = {
      padding: "10px",
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
      dropFilter: 'blur(10px)',
      webkitBackdropFilter: 'blur(10px)',
      borderRadiux: '20px',
      border: '10px solid rgba (255,255,255,0.18)',
      boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)'
    };


    const CssButtonGroup = withStyles({
      root: {
        '& .MuiButtonGroup-groupedTextHorizontal:not(:last-child)': {
          borderRight: '1px solid rgba(255, 255, 255, 0.23)'
        }
      },
      })(ButtonGroup);

    const CssTextField = withStyles({
      root: {
        '& .MuiFormLabel-root': {
          textOverflow: 'ellipsis !important',
          color: 'white'
        },
        '& .MuiInputBase-root': {
          textOverflow: 'ellipsis !important',
          color: 'white'
        },
        '& placeholder': {
          textOverflow: 'ellipsis !important',
          color: 'white'
        },
        '& label.Mui-focused': {
          color: 'white',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
          },
        },
      },
    })(TextField);

    return (
      <div style={backgroundStyles}>
        <Paper elevation={3} style={ glass }>
          <Typography variant="h3" component="h2" color="common.white" style={{textAlign: "center"}}>WATSON</Typography>
          <br />
          <div style={spacing}>
            <span style={
              {
                color: "white", 
                padding: "16px"
              }
            }>Username</span>
            <CssTextField id="outlined-basic" label="Username" variant="outlined" margin="normal" />
          </div>
          <br />
          <div style={spacing}>
            <span style={
              {
                color: "white", 
                padding: "16px"
              }
            }>Password</span>
            <CssTextField id="outlined-basic" label="Password" variant="outlined" ref='password'
              hintText="Password"
              floatingLabelText="Password"
              type="password" margin="normal" />
          </div>
          <br />
          <CssButtonGroup style={spacing} variant="text" aria-label="text button group">
            <Button onClick={LoginCallback} style={
              {
                alignSelf: "flex-start",
                color: "rgba(255,255,255,100)"
              }
            }>Login</Button>
            <Button style={
              { alignSelf: "flex-end" ,
                color: "rgba(255,255,255,100)"
              }
            }>Sign-In</Button>
          </CssButtonGroup>
        </Paper>
      </div>
    );
  }
}

export default LoginComponent;
