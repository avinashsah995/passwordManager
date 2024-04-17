import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid item xs={8} sm={6} md={6} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            width: '90%',
                            margin: '10% auto 0',
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
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
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
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
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
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