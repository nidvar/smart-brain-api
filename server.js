const express = require('express');
const app = express();
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');
const clarifai = require('clarifai');
app.use(cors())

const clarifai_app = new clarifai.App({
    apiKey:process.env.clarifai_heroku_key
});

const signin = require('./controllers/signin');
const onRegister = require('./controllers/register');
const profile_stuff = require('./controllers/profile')

const database = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      },
    }
});


app.use(express.json())

app.get('/', (req, res)=>{
    res.json('random')
})

app.post('/signin', (req, res)=>{signin.signin(req, res, database, bcrypt)})

app.post('/register', (req, res)=>{onRegister.onRegister(req, res, database, bcrypt)})

app.get('/profile/:id', (req, res)=>{profile_stuff.profile_stuff(req, res, database)})

app.post('/grab_api', (req, res)=>{

    clarifai_app.models.predict(
        Clarifai.FACE_DETECT_MODEL,
        req.body.user_input
    ).then(a=>{
        res.json(a)
    }).catch(a=>{
        console.log(a)
    })

})

app.listen(process.env.PORT || 3001, ()=>{
    console.log('3001 ======================');
})