const {v4: uuidv4} = require('uuid');
const {setUserToSessionId,getUserFromSessionId}= require('../service/auth');


const User = require('../models/user')


async function handleUserSignup(req, res){
    const {name, email, password} = req.body;

    await User.create({
        name,
        email,
        password
    });
    console.log(`User : ${email} signed in.`)

    return res.redirect('/');
}


async function handleUserLogin(req, res){
    const {email, password} = req.body;

    const user= await User.findOne({email, password});
    if(!user) return res.render('login',{
        error: "invalid username or password!!!."
    })

    const sessionId= uuidv4();
    setUserToSessionId(sessionId, user);
    res.cookie("uid", sessionId);
    console.log(`User : ${email} logged in.`)
    return res.redirect('/');
}


module.exports={
    handleUserSignup,
    handleUserLogin
    
}