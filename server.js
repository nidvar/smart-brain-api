const express = require('express');
const app = express();
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

const database = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'post',
      database : 'smart-brain'
    }
});

console.log(database.select('*').from('users'));

app.use(cors())
app.use(express.json())

app.get('/', (req, res)=>{
    res.json(mydb)
})

app.post('/signin', (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    //loop throught LOGIN database & check if email is correct.
    database.select('*').from('login').where({email: email}).then(the_user=>{
        if(the_user.length>0){
            bcrypt.compare(password, the_user[0].hash, function(err, result) {
                if(result == true){
                    database.select('*').from('users').where({email: email}).then(user_from_users_table=>{
                        res.json(user_from_users_table)
                    })
                }else{
                    console.log('password fail')
                    res.status(400).json('password fail')
                }
            });
        }else{
            console.log('email fail')
            res.status(400).json('email fail')
        }
    })
    
})

app.post('/register', (req, res)=>{
    console.log('43', req.body)

    bcrypt.hash(req.body.password, 10, function(err, hash) {
        console.log(hash)
        console.log(err)

        database('users').insert({
            email: req.body.email,
            name: req.body.name,
            joined: new Date()
        }).then(console.log)
    
        database('login').insert({
            email: req.body.email,
            hash: hash,
        }).then(console.log)

    });

    res.json(req.body)
})

app.get('/profile/:id', (req, res)=>{

    database.select('*').from('users').where({id: req.params.id})
        .then(a=>{
            console.log('LINE 95', a)
        })
    
    database('users').where({id: req.params.id})
        .increment('entries', 1)
        .returning('entries')
        .then(a=>{
            console.log('does it work now?')
        })
    res.json('stuff')

})

app.listen(3001, ()=>{
    console.log('3001 ======================');
})