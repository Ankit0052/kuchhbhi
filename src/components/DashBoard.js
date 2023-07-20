//https://mui.com/store/previews/minimal-dashboard-free/

import * as React from "react";
import { AppBar, Grid, Paper } from "@mui/material";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import ShowLogin from "./ShowLogin";

export default function DashBoard(props) {
    var navigate = useNavigate();


    return (
        <div>
            <AppBar position="static" style={{ background: "#000" }}>
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon style={{ color: "#FFF" }} />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        <span style={{ color: "#FFF" }}>Employee DashBoard</span>
                    </Typography>
                </Toolbar>
            </AppBar>


            <Grid container spacing={3}>
                <Grid item xs={2}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <ListItemButton onClick={() => navigate("/dashboard/ShowLogin")}>
                            <ListItemIcon>
                                <AddPhotoAlternateIcon />
                            </ListItemIcon>
                            <ListItemText primary={
                                <span style={{ fontWeight: 500, letterSpacing: 1, fontFamily: "Poppins", }}>
                                    Employee List
                                </span>} />
                        </ListItemButton>
                        <Divider />
                    </div>
                </Grid >

                <Grid item xs={10}>
                    <Routes>
                        <Route element={<ShowLogin />} path={"/showlogin"} />
                    </Routes>
                </Grid>
            </Grid >
        </div >
    );
}
