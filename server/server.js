const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userDataModel = require('./models/userModel');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://avinashsah995:avinashsah995mongodb@cluster0.87z3mmo.mongodb.net/userData');

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

app.listen(5000, ()=> {
    console.log('server listening on port 5000');
})