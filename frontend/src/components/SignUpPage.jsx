import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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



const SignUpPage = () => {
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

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        allowExtraEmails: false,
    })

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        }

        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = 'Confirm Password is required';
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Confirm Password doesnot match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Form Submitted: ', formData);

        axios.post('http://localhost:5000/signup', {...formData})
        .then((res)=> {console.log('Form Submitted: ', res)
        navigate('/');
        })
        .catch((err) => console.error('Error in submitting form', err));

        
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={8} sm={6} md={6} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            width: '90%',
                            margin: '5% auto 0',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                    />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type='email'
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        error={!!errors.password}
                                        helperText={errors.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        type="confirmPassword"
                                        id="confirmPassword"
                                        autoComplete="new-confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.allowExtraEmails}
                                                onChange={handleChange}
                                                name="allowExtraEmails"
                                                color="primary"
                                            />
                                        }
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <RouterLink to="/" style={{ textDecoration: 'underline', color: '#1976d2' }}>
                                        <Typography variant="body2">
                                            {"Already have an account? Sign in"}
                                        </Typography>
                                    </RouterLink>
                                    {/* <Link href="#" variant="body2">
                                        Already have an account? Sign in
                                    </Link> */}
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
                </Grid>
                <Grid
                    item
                    xs={4}
                    sm={6}
                    md={6}
                    sx={{
                        backgroundImage: `url(${bgImageFetch ? defaultbgimg : bgImage})`, backgroundImage: `url(${bgImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

            </Grid>
        </ThemeProvider>
    );
}

export default SignUpPage