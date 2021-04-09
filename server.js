const express = require('express')
const app = express();
const cors = require('cors');

app.use(cors())
app.use(express.json())

const mydb = [
    {
        id: 1,
        name: 'rick',
        email: 'rick@hotmail.com',
        password: 'white'
    },
    {
        id: 2,
        name: 'morty',
        email: 'morty@hotmail.com',
        password: 'yellow'
    },
    {
        id: 3,
        name: 'beth',
        email: 'beth@hotmail.com',
        password: 'red'
    }
]

app.get('/', (req, res)=>{
    res.json('get request')
})

app.post('/signin', (req, res)=>{
    if(req.body.email == mydb[0].email){
        res.json('win. Successfull sign in.')
    }else{
        res.status(400).json('not successfull')
    }
    res.send('sign in post request')
})

app.post('/register', (req, res)=>{
    console.log(req.body)
    mydb.push({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    res.send(mydb)
})

app.get('/profile/:id', (req, res)=>{

    mydb.forEach((a)=>{
        if(req.params.id == a.id){
            console.log('win !!!!!')
        }
    })
    console.log(req.body)
    res.send('stuff')
})

app.listen(3001, ()=>{
    console.log('3001 ======================');
})