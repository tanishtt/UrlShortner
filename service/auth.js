//statefull
// const mapSessionIdToUser= new Map();


// function setUserToSessionId(id, user){
//     mapSessionIdToUser.set(id, user);
// }

// function getUserFromSessionId(id){
//     return mapSessionIdToUser.get(id);  
// }

// module.exports={
//     setUserToSessionId,
//     getUserFromSessionId
// }


const jwt =require('jsonwebtoken');
const secretKey='1234567890';


function setUser(user){
    const payload={
        ...user
    }

    return jwt.sign(payload, secretKey);//generate token using 
}

function getUser(token){
    if(!token){return null;}

    try{
        return jwt.verify(token, secretKey);//generate token using 
    }
    catch(err){
        console.log("jwt authentication error");
        return null;
    }
}

module.exports={
    setUser,
    getUser,
}

//state to mere pass hai, jisko mai change nahi kar skta,(though kr diya in jwt.io using secretkey).
//info of user, email password can be only changes with help of secretkey.


