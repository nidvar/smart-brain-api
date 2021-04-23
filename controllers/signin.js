//SIGN IN CONTROLLER

const signin = (req, res, database, bcrypt)=>{
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
}

module.exports = {
    signin: signin
}