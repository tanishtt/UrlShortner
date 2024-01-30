const {getUser} = require('../service/auth')

//authentication
function checkForAuthentication(req, res, next){
    //token authentication.
    // const authorizationHeaderValue= req.headers["authorization"];
    const tokenCookie= req.cookies?.token;

    req.user =null;

    // if(
    //     !authorizationHeaderValue 
    //     || !authorizationHeaderValue.startsWith("Bearer")
    //     )
    //     {return next();}

    if(!tokenCookie){return next();}


    // const token= authorizationHeaderValue.split("Bearer ")[1];
    const token=tokenCookie;
    const user=getUser(token);
    
    req.user =user;
    return next();
}


//for admin, for user, for employee, for manager, for workers. kisko dedicate krna hai.
//roles=>array=>[admin, worker]//means restrict to admin, worker.

//autherization
function restrictTo(roles){
    return function(req, res, next){
        if(!req.user){ return res.redirect('/login');}

        if(!roles.includes(req.user.role)) { return res.end('Sorry, UnAuthorized')}

        return next();
    };
}
//autherization


module.exports= {
    checkForAuthentication,
    restrictTo,
    };


//just authentication


// async function restrictToLoggedInUserOnly(req, res, next){
//     console.log(req);
//     const userUID= req.headers["authorization"];
//     console.log(userUID)
//     if(!userUID){
//         return res.redirect('/login');
//     }

//     const token= userUID.split('Bearer ')[1];
//     const user=getUser(token);
//     console.log(user);
//     if(!user){ return res.redirect('/login')}

//     req.user= user;
//     next();

// }


// async function checkAuth(req, res, next){
//     const userUID= req.headers["authorization"];
//     console.log(userUID);
    
//     // if(!userUID){
//     //     return res.json({msg:"no user"});
//     // }
//     const token= userUID.split('Bearer ')[1];
//     const user=getUser(token);
    
//     req.user= user;
//     next();
// }


// module.exports= {
//     restrictToLoggedInUserOnly,
//     checkAuth
//     };