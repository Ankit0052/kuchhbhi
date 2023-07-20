import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postData } from '../services/ServerServices';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright Â© '}
      <Link color="inherit" href="https://Tecnology.in/">
        the7shades
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function AdminLogin() {
  var navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async () => {
    var body = {
      email: email, password: password
    }
    var result = await postData('adminlogin/chk_login', body)
    if (result.status) {
      Swal.fire({
          icon: 'success',
          title: result.message,
      })
      navigate('/login')
  }
  else {
      Swal.fire({
          icon: 'error',
          title: result.message,
      })
  }
}


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
        >
          <img src="assets/pic.jpg" style={{ width: '100%', height: '100%' }} />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{ my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"
                autoComplete="email" autoFocus onChange={(event) => setEmail(event.target.value)} />

              <TextField margin="normal" required fullWidth name="password" label="Password" type="password"
                id="password" onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />

              <Button type="button" onClick={handleClick} fullWidth variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}