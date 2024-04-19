import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';

import defaultbgimg from '../assets/images/defaultbgimage.jpg';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Password Manager
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// Define your default theme
const defaultTheme = createTheme();



const LoginPage = () => {

    const [bgImage, setBgImage] = useState('');
    const [bgImageFetch, setBgImageFetch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://source.unsplash.com/featured/?quote')
         .then((res) => setBgImage(res.url))
         .catch((err) => {
            setBgImageFetch(true)
            console.error('Error in fetching Bg Image',err)
         })
    }, []);

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [loginErrors, setLoginErrors] = useState({});

    const handleInputChange = (e) => {
        const {name, value, type}  = e.target;
        setLoginData({
           ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};

        if(!loginData.email.trim()){
            newErrors.email = "Email is required";
        }

        if(!loginData.password.trim()){
            newErrors.password = "Password is required";
        }

        if(Object.keys(newErrors).length > 0){
            setLoginErrors(newErrors);
            return;
        }

        console.log('Login Data: ', loginData);

        axios.post('http://localhost:5000/', {...loginData})
        .then((res)=> {console.log('Form Submitted: ', res)
        if(res.data === 'Success'){
            navigate('/home');
        }
        })
        .catch((err) => console.error('Error in submitting form', err));

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgImageFetch ? defaultbgimg : bgImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 4,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={loginData.email}
                                    onChange={handleInputChange}
                                    error={!!loginErrors.email}
                                    helperText={loginErrors.email}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={loginData.password}
                                    onChange={handleInputChange}
                                    error={!!loginErrors.password}
                                    helperText={loginErrors.password}
                                />
                                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  /> */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleSubmit}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <RouterLink to="" style={{ textDecoration: 'underline', color: '#1976d2' }}>
                                            <Typography variant="body2">
                                                {"Forgot password?"}
                                            </Typography>
                                        </RouterLink>
                                    </Grid>
                                    <Grid item>
                                        <RouterLink to="/signup" style={{ textDecoration: 'underline', color: '#1976d2' }}>
                                            <Typography variant="body2">
                                                {"Don't have an account? Sign Up"}
                                            </Typography>
                                        </RouterLink>

                                    </Grid>
                                </Grid>
                                <Grid>
                                <Grid container justifyContent="center" alignItems="center" mt={2}>
                                    <Grid item xs={5}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={2} sx={{ textAlign: 'center' }}>
                                        or
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Divider />
                                    </Grid>
                                </Grid>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <IconButton aria-label="Google">
                                        <GoogleIcon />
                                    </IconButton>
                                    <IconButton aria-label="Facebook">
                                        <FacebookIcon />
                                    </IconButton>
                                    <IconButton aria-label="Twitter">
                                        <XIcon />
                                    </IconButton>
                                </Box>
                            </Grid>
                            </Box>
                        </Box>
                        <Box>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default LoginPage