import { AppBar, Container, CssBaseline, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";

import './Header.scss'
const useStyles = makeStyles(theme => ({
    appBar: {
      top: "auto",
      bottom: 0,
      textAlign:"center",
      display:"flex",

    },
    footer: {
      display:"flex",
      justifyContent:"center",
    }
  }));

const Footer = () => {
    const classes = useStyles();

  return (
    <React.Fragment>
    
    </React.Fragment>
  );
};

export default Footer;
