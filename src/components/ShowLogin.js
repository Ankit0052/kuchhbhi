import React, { useEffect, useState } from "react";
import MaterialTable from "@material-table/core";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { TextField, Grid, FormControl, InputLabel, MenuItem, Select, Button, Avatar, IconButton } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useStyles } from "./LoginCss";
import CloseIcon from '@mui/icons-material/Close';
import { getData, ServerURL, postData } from "../services/ServerServices";
import Swal from "sweetalert2";

export default function ShowLogin() {
    var classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [image, setImage] = useState('')
    const [loginId, setLoginId] = useState('')

    const [login, setLogin] = useState([])
    const [cities, setCities] = useState([])
    const [states, setStates] = useState([])

    const [btnStatus, setBtnStatus] = useState(false)
    const [oldPicture, setOldPicture] = useState('')

    const [message, setMessage] = useState("")

    const handleStateChange = (event) => {
        setState(event.target.value)
    }
    const handleCityChange = (event) => {
        setCity(event.target.value)
    }
    const handleImage = (event) => {
        setImage({ fileName: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] });
        setBtnStatus(true)
    };
    const fatchAllStates = async () => {
        var result = await getData('statecity/fetch_all_states')
        setStates(result.data)
    }

    useEffect(function () {
        fatchAllStates()
    }, [])
    const fillStates = () => {
        return states.map((item) => {
            return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)

        })
    }

    const fetchAllCities = async (stateid) => {
        var body = { 'stateid': stateid }
        var result = await postData('statecity/fetch_all_cities', body)
        // alert(JSON.stringify(result))
        setCities(result.data)
    }
    useEffect(function () {
        fetchAllCities()
    }, [])

    const fillCities = () => {
        return cities.map((item) => {
            return (<MenuItem value={item.citiesid}>{item.citiesname}</MenuItem>)

        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenDialog = (rowData) => {
        fetchAllCities(rowData.state)
        setLoginId(rowData.loginid)
        setFName(rowData.fname)
        setLName(rowData.lname)
        setEmail(rowData.email)
        setMobile(rowData.mobile)
        setAddress(rowData.address)
        setState(rowData.state)
        setCity(rowData.city)
        setImage({ fileName: `${ServerURL}/images/${rowData.image}`, bytes: "", })
        setOldPicture(rowData.image)
        setOpen(true);
    }

    const handleEditData = async () => {
        var body = {
            'loginid':loginId,
            'fname': fname,
            'lname': lname,
            'email': email,
            'mobile': mobile,
            'address': address,
            'state': state,
            'city': city,
        }
        var result = await postData('login/edit_data', body)
        if (result.status) {
            // setOpen(false)
            Swal.fire({
                icon: 'success',
                title: result.message,
            })
        }
        else {
            Swal.fire({
                icon: 'error',
                title: result.message,
            })

        }
        fetchAllLogin()
    }

    const handleCancel=()=>{
        setImage({fileName:`${ServerURL}/images/${oldPicture}`,bytes:''})
        setOldPicture('')
        setBtnStatus(false)
        setMessage('')
       }
       
    const handleSaveImage = async () => {
        var formData = new FormData()
        formData.append('loginid', loginId)
        formData.append('image', image.bytes)
        var result = await postData('login/edit_login_image', formData)
        if (result.status) {
            setMessage("assets/tick.gif")
        }
        else {
            setMessage("")

        }
        fetchAllLogin()
        setBtnStatus(false)

    }
    const PictureButton=()=>{
        return(<div>
          {btnStatus?<div style={{display:'flex',padding:10}}>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSaveImage}>Save</Button>
          </div>:<div style={{fontSize:20,color:'green',fontWeight:'bold'}} ><img src={`${message}`} width="60"/></div>}
        </div>)
     
      }   
      

      const handleDelete=async(rowData)=>{
        setOpen(false)
         Swal.fire({
           title: 'Do you want to delete company?',
          
           showCancelButton: true,
           confirmButtonText: 'Delete',
         
         }).then(async(result) => {
           /* Read more about isConfirmed, isDenied below */
           if (result.isConfirmed) {
             var res=await postData('login/delete_data',{loginid:rowData.loginid})
   
             if(res.status)
             {Swal.fire('Deleted!', '', 'Success')
             fetchAllLogin()
            }
             else
             Swal.fire({
               icon: 'error',
               title: result.message,
              })
            
           } else if (result.isDenied) {
             Swal.fire('Changes are not saved', '', 'info')
           }
         })  
     
    } 

    const ShowLoginDetails = () => {
        return (
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        id="alert-dialog-title"
                        style={{ display: "flex", justifyContent: "space-between" }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            Employee Details Update
                        </div>
                        <div>
                            <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className={classes.container}>
                            <div className={classes.boxs}>
                                <Grid container spacing={2}>
                                <Grid item xs={6}>
                                        <TextField fullWidth value={loginId} onChange={(event) => setLoginId(event.target.value)} label="LoginId" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth value={fname} onChange={(event) => setFName(event.target.value)} label="First Name" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth value={lname} onChange={(event) => setLName(event.target.value)} label="Last Name" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth value={email} onChange={(event) => setEmail(event.target.value)} label="Email Address" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth value={mobile} onChange={(event) => setMobile(event.target.value)} label="Mobile Number" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth value={address} onChange={(event) => setAddress(event.target.value)} label="Address" variant="outlined" />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">State</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={state}
                                                label="State"
                                                onChange={handleStateChange}
                                            >
                                                <MenuItem value={'Choose State'}>Choose State</MenuItem>
                                                {fillStates()}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={city}
                                                label="City"
                                                onChange={handleCityChange}
                                            >
                                                <MenuItem value={'Choose City'}>Choose City</MenuItem>
                                                {fillCities()}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row' }}>
                                        <IconButton
                                            fullWidth
                                            color="primary"
                                            aria-label="upload picture"
                                            component="label"
                                        >
                                            <input
                                                hidden
                                                accept="image/*"
                                                type="file"
                                                onChange={handleImage}
                                            />
                                            <PhotoCamera />
                                        </IconButton>
                                        <Avatar
                                            alt="Remy Sharp"
                                            src={image.fileName}
                                            sx={{ width: 60, height: 60 }}
                                        />
                                        <PictureButton/>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditData}>Edit</Button>
                        <Button onClick={handleClose} autoFocus>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }


    const fetchAllLogin = async () => {
        var result = await getData('login/fetch_all_login')
        // alert(JSON.stringify(result))
        setLogin(result.data)
    }
    useEffect(function () {
        fetchAllLogin()
    }, [])



    function ShowData() {

        return (
            <MaterialTable
                title="Show Employee Details"
                columns={[
                    {
                        title: "Login Id",
                        field: "loginid",
                        render: (rowData) => <div>{rowData.loginid}</div>,
                    },
                    {
                        title: "Name",
                        field: "name",
                        render: (rowData) => <div>{rowData.fname}&nbsp;{rowData.lname}</div>,
                    },
                    { title: 'Email address', field: 'email' },
                    { title: 'Mobile Number', field: 'mobile' },
                    { title: 'Address', field: 'address' },
                    { title: 'State', field: 'state' },
                    { title: 'City', field: 'city' },
                    {
                        title: 'Profile',
                        render: rowData => <Avatar src={`${ServerURL}/images/${rowData.image}`} style={{ width: 70, height: 70 }} variant="rounded" />
                    },
                ]}
                data={login}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => handleOpenDialog(rowData),
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => handleDelete(rowData),
                    }
                ]}
            />
        )
    }

    return (
        <div className={classes.mainContainer} >
            <div className={classes.boxes}>
                
                {ShowData()}
                {ShowLoginDetails()}
            </div>
        </div>
    )
}