const onRegister = (req, res, database, bcrypt)=> {
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
}

module.exports = {
    onRegister:onRegister
}