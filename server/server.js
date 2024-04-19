const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userDataModel = require('./models/userModel');

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);

app.post('/signup', (req, res) => {
    userDataModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err))
})

app.post('/', (req, res) => {
    const {email, password} = req.body;
    userDataModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json('Success');
            } else {
                res.json({message: 'Password is incorrect'});
            }
        } else {
            res.json({message: 'User not found'});
        }
    })
})

app.listen(PORT, ()=> {
    console.log(`server listening on port ${PORT}`);
})