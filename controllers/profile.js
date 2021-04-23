const profile_stuff = (req, res, database)=>{
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
}

module.exports={
    profile_stuff: profile_stuff
}