const onRegister = (req, res, database, bcrypt)=> {
    if(req.body.password.length < 8){
        console.log('SERVER: password too small')
        return
    }
    let emailvalidation = req.body.email.split('');

    if(!emailvalidation.includes('@') || !emailvalidation.includes('.')){
        console.log('SERVER: please enter valid email')
        return
    }

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
}

module.exports = {
    onRegister:onRegister
}