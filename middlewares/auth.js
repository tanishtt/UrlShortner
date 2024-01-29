const {getUserFromSessionId} = require('../service/auth')


async function restrictToLoggedInUserOnly(req, res, next){
    console.log(req);
    const userUID= req.cookies?.uid;

    if(!userUID){
        return res.redirect('/login');
    }
    const user=getUserFromSessionId(userUID);
    console.log(user);
    if(!user){ return res.redirect('/login')}

    req.user= user;
    next();

}


async function checkAuth(req, res, next){
    const userUID= req.cookies?.uid;

    const user=getUserFromSessionId(userUID);
    
    req.user= user;
    next();
}


module.exports= {
    restrictToLoggedInUserOnly,
    checkAuth
    };