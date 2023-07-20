import React, { useState, useEffect } from "react";
import { TextField, Grid, FormControl, InputLabel, MenuItem, Select, Button, Avatar, IconButton } from "@mui/material";
import { useStyles } from "./LoginCss";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Swal from "sweetalert2";
import { getData, postData } from "../services/ServerServices";
import { useNavigate } from "react-router-dom";
export default function Login() {
    var classes = useStyles();
    var navigate = useNavigate();

    const [fname, setFName] = useState('')
    const [lname, setLName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [image, setImage] = useState('')

    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    const handleStateChange = (event) => {
        setState(event.target.value)
        fetchAllCities(event.target.value)
    }
    const handleCityChange = (event) => {
        setCity(event.target.value)
    }
    const handleImage = (event) => {
        setImage({ fileName: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] });
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

    const clearValue = () => {
        setFName('')
        setLName('')
        setEmail('')
        setMobile('')
        setAddress('')
        setState('Choose State')
        setCity('Choose City')
        setImage('')

    }

    const handleSubmit = async () => {

        var formData = new FormData()
        formData.append('fname', fname)
        formData.append('lname', lname)
        formData.append('email', email)
        formData.append('mobile', mobile)
        formData.append('address', address)
        formData.append('state', state)
        formData.append('city', city)
        formData.append('image', image.bytes)
        var result = await postData('login/add_data', formData)
        // alert (JSON.stringify(result))
        if (result.status) {
            Swal.fire({
                icon: 'success',
                title: result.message,
            })
            navigate('/dashboard')
        }
        else {
            Swal.fire({
                icon: 'error',
                title: result.message,
            })

        }
        clearValue()
    }



    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.headline}>
                        Employee Details
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
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={handleSubmit}>Submit</Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button fullWidth variant="contained" onClick={clearValue}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}