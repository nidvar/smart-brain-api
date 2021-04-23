const express = require('express');
const app = express();
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const signin = require('./controllers/signin');
const onRegister = require('./controllers/register');
const profile_stuff = require('./controllers/profile')

const database = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'post',
      database : 'smart-brain'
    }
});

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.json(mydb)
})

app.post('/signin', (req, res)=>{signin.signin(req, res, database, bcrypt)})

app.post('/register', (req, res)=>{onRegister.onRegister(req, res, database, bcrypt)})

app.get('/profile/:id', (req, res)=>{profile_stuff.profile_stuff(req, res, database)})

app.listen(3001, ()=>{
    console.log('3001 ======================');
})